import { RequestHandler } from "express-serve-static-core";
import profileModel from '../models/profile'
import createHttpError from "http-errors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


interface CreateProfileBody {
    name: string,
    email: string,
    password: string
}

interface UpdateProfileParams {
    id: string
}

interface UpdateProfileBody {
    name: string,
    email?: string,
    password?: string
}


interface LoginBody {
    email?: string,
    password?: string
}

export const getProfiles: RequestHandler = async (req, res, next) => {
    try {
        const profiles = await profileModel.find().exec();
        res.status(200).json(profiles);
    }
    catch (error) {
        next(error);
    }
}

export const getProfile: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Profile Id");
        }
        const profile = await profileModel.findById(id).exec();
        if (!profile) {
            throw createHttpError(404, "Profile not found");
        }
        res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
}

export const createProfile: RequestHandler<unknown, unknown, CreateProfileBody, unknown> = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordHash = await bcrypt.hash(password, 10);


    try {
        if (!name || !email || !password) {
            throw createHttpError(400, "Profile has missing fields. Name, Email and Password required.")
        }

        const existsUser = await profileModel.findOne({ email: email });
        if (existsUser) {
            console.log(existsUser)
            throw createHttpError(409, "User email is already present. Please Login.")
        }
        const newProfile = await profileModel.create({
            name: name,
            email: email,
            password: passwordHash,
        })

        req.session.userId = newProfile._id;
        res.status(201).json(newProfile);
    }
    catch (error) {
        next(error);
    }
}

export const updateProfile: RequestHandler<UpdateProfileParams, unknown, UpdateProfileBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Profile Id");
        }
        const profile = await profileModel.findByIdAndUpdate(id, req.body).exec();
        if (!profile) {
            throw createHttpError(404, "Profile not found");
        }
        res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
}

export const deleteProfile: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Profile Id");
        }
        const profile = await profileModel.findByIdAndDelete(id).exec();
        if (!profile) {
            throw createHttpError(404, "Profile not found");
        }
        res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
}

export const loginProfile: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!email || !password) {
            throw createHttpError(400, "Parameters Missing");
        }
        const user = await profileModel.findOne({ email: email }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid Credentials");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid Credentials");
        }
        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;
    console.log(req.session.userId);
    try {
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }
        const user = await profileModel.findById(authenticatedUser).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
}
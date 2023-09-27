import * as ProfileController from "../controllers/login"
import { requiresAuth } from "../middleware/auth";
import express from "express";

const router = express.Router();

router.get('/', requiresAuth, ProfileController.getAuthenticatedUser);

router.post('/signup', ProfileController.createProfile);

router.post('/login', ProfileController.loginProfile);

router.post('/logout', ProfileController.logout);


export default router;
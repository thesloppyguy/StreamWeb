import "dotenv/config";
import express, { Request, Response, NextFunction } from 'express';
import loginRoutes from './routes/login'
import morgan from 'morgan';
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from "cors";

const app = express();

// const corsOpts = {
//     origin: '*',
//     credentials: false,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type']
// };

// Log Handler
app.use(morgan('dev'));

// Data type Handler
app.use(express.json());

// Session Handler
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.MONGODB_URL })
}));

// Cors Middleware
// app.use(cors(corsOpts));
app.use(cors());

// Routes
app.use("/api/users", loginRoutes);

// Route Handler
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not Found"));
})

// Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unknown error has occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ Error: errorMessage });
});


export default app;
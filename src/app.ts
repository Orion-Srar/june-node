import express, {NextFunction, Request, Response} from 'express';
import * as mongoose from "mongoose";

import {configs} from "./configs";
import {authRouter, userRouter} from "./routers";
import {ApiError} from "./errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    return res.status(status).json(err.message)
});

app.listen(configs.PORT, () => {
    mongoose.connect(configs.DB_URL)
    console.log(`Server has started on PORT ${configs.PORT}`);
});
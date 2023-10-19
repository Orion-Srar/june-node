import express, {NextFunction, Request, Response} from 'express';
import * as mongoose from "mongoose";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJson from "./utils/swagger.json";
import fileUpload from "express-fileupload";

import {configs} from "./configs";
import {authRouter, userRouter} from "./routers";
import {ApiError} from "./errors";
import {cronRunner} from "./crons";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    return res.status(status).json(err.message)
});

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.DB_URL)
    console.log(`Server has started on PORT ${configs.PORT}`);
    cronRunner();
});
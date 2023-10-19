import {NextFunction, Request, Response} from "express";
import {createReadStream} from "streamifier";
import multer from "multer";

import {IUser} from "../types";
import {IQuery, userService} from "../services";
import {UploadedFile} from "express-fileupload";
import {userMapper} from "../mapers/user.mapper";
import {ApiError} from "../errors";
import {s3Service} from "../services/s3.service";

class UserController {
    public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.findAllWithPagination(req.query as unknown as IQuery);
            return res.json(users)
        } catch (e) {
            next(e)
        }
    };

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const createdUser = await userService.create(req.res.locals as IUser)
            return res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    };

    public async findById(req: any, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {

            const userById = await userService.findById(req.validId)
            const response = userMapper.toResponse(userById);

            return res.status(201).json(response)

        } catch (e) {
            next(e)
        }

    };

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const {userId} = req.params;
            const user = await userService.update(userId, req.body as IUser);
            const response = userMapper.toResponse(user);
            return res.status(200).json(response);

        } catch (e) {
            next(e);
        }
    };

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {userId} = req.params;
            await userService.delete(userId);
            return res.sendStatus(200);

        } catch (e) {
            next(e);
        }
    };

    public async uploadAvatar(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {userId} = req.params;
            const avatar = req.files.avatar as UploadedFile;

            const user = await userService.uploadAvatar(userId, avatar);

            const response = userMapper.toResponse(user);
            return res.json(response).status(201);
        } catch (e) {
            next(e);
        }
    };

    public async deleteAvatar(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {userId} = req.params;

            const user = await userService.deleteAvatar(userId);

            const response = userMapper.toResponse(user);

            return res.status(201).json(response);

        } catch (e) {
            next(e);
        }
    };

    public async uploadVideo(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {userId} = req.params;
            const upload = multer().single("");

            upload(req, res, async (err) => {
                if (err) {
                    throw new ApiError('Download error', 500);
                }

                const video = req.files.video as UploadedFile;

                const stream = createReadStream(video.data);

                const videoPath = await s3Service.uploadFileStream(stream, 'user', userId, video);
                return res.status(201).json(videoPath);
            });

        } catch (e) {
            next(e);
        }
    };
};

export const userController = new UserController();
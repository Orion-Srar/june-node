import {NextFunction, Response} from "express";
import {avatarCanfig} from "../configs/file.config";
import {ApiError} from "../errors";


class FileMiddleware {

    public isAvatarValid(req: any, res: Response, next: NextFunction) {
        try {
            const {mimetype, size} = req.files.avatar;

            if (!avatarCanfig.MIMETYPES.includes(mimetype)) {
                throw new ApiError('Avatar has invalid format', 400);
            };

            if (size > avatarCanfig.MAX_SIZE) {
                throw new ApiError('Avatar too big', 400);
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}

export const fileMiddleware = new FileMiddleware();

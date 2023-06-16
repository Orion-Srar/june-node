import {NextFunction, Request, Response} from "express";

import {User} from "../models";
import {ApiError} from "../errors";

class UserMiddleware {
    public isUserExist<T>(field: keyof T) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const user = await User.findOne({[field]: req.body[field]});
                if (!user) {
                    throw new ApiError('User not found', 422)
                }

                req.res.locals.user = user;
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public async findAndThrow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user){
                throw new ApiError('User with this email already exist', 409);
            }
            next();
        }catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
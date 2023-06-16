import {NextFunction, Request, Response} from "express";

import {IUser} from "../types";
import {userService} from "../services";

class UserController {
    public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.findAll();
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
    //
    // public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
    //     try {
    //         const createdUser = await userService.create(req.res.locals as IUser)
    //         return res.status(201).json(createdUser);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    public async findById(req: any, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {

            const userById = await userService.findById(req.validId)
            return res.status(201).json(userById)

        } catch (e) {
            next(e)
        }

    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const {userId} = req.params;
            const user = await userService.update(userId, req.body as IUser)
            return res.status(200).json(user);

        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {userId} = req.params;
            await userService.delete(userId);
            return res.sendStatus(200);

        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
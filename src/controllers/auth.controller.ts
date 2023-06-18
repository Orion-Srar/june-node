import {NextFunction, Response, Request} from "express";

import {authService} from "../services";
import {ITokenPair, ITokenPayload} from "../types";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            await authService.register(req.body);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }

    };

    public async login(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {

            const tokensPair = await authService.login(req.body, req.res.locals.user);

            return res.status(200).json({
                ...tokensPair,
            })
        } catch (e) {
            next(e);
        }
    };

    public async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {
            const {_id: userId} = req.res.locals.tokenPayload as ITokenPayload;

            await authService.changePassword(req.body, userId);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    };

    public async refresh(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {
            const oldTokenPair = req.res.locals.oldTokenPair as ITokenPair;
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

            const tokensPair = await authService.refresh(oldTokenPair, tokenPayload);

            return res.status(200).json(tokensPair)
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
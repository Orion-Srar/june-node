import {Router} from 'express';

import {authController} from "../controllers";
import {authMiddleware, commonMiddleware, userMiddleware} from "../middlewares";
import {UserValidator} from "../validators";
import {ICredentials} from "../types";

const router = Router();

router.post(
    '/register',
    commonMiddleware.isBodyValid(UserValidator.create),
    userMiddleware.findAndThrow,
    authController.register
);

router.post(
    '/login',
    commonMiddleware.isBodyValid(UserValidator.login),
    userMiddleware.isUserExist<ICredentials>('email'),
    authController.login
);

router.post(
    '/changePassword',
    commonMiddleware.isBodyValid(UserValidator.changePassword),
    authMiddleware.checkAccessToken,
    authController.changePassword
);

router.post(
    '/loginEmail',

)

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);


export const authRouter = router;
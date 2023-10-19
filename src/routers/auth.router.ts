import {Router} from 'express';

import {authController} from "../controllers";
import {authMiddleware, commonMiddleware, userMiddleware} from "../middlewares";
import {UserValidator} from "../validators";
import {ICredentials, IUser} from "../types";
import {EActionTokenTypes} from "../enums";

const router = Router();

router.post(
    '/register',
    commonMiddleware.isBodyValid(UserValidator.create),
    userMiddleware.findAndThrow,
    authController.register
);

router.post(
    '/register/:token',
    authMiddleware.checkActionToken(EActionTokenTypes.Activate),
    authController.activate,
)

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

router.post(
    '/forgot',
    commonMiddleware.isBodyValid(UserValidator.forgotPassword),
    userMiddleware.isUserExist<IUser>('email'),
    authController.forgotPassword
);

router.put(
    '/forgot/:token',
    commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
    authMiddleware.checkActionToken(EActionTokenTypes.Forgot),
    authController.setForgotPassword,
)


export const authRouter = router;
import {Router} from 'express';

import {userController} from "../controllers";
import {authMiddleware, commonMiddleware} from "../middlewares";
import {UserValidator} from "../validators";
import {fileMiddleware} from "../middlewares/file.middleware";

const router = Router();

router.get(
    "/",
    userController.findAll
);
router.get(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.findById
);
router.put(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(UserValidator.update),
    authMiddleware.checkAccessToken,
    userController.update
);
router.delete(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.delete
);

router.post(
    "/:userId/avatar",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar
);

router.delete(
    "/:userId/avatar",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userController.deleteAvatar
);

router.post(
    "/:userId/video",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userController.uploadVideo
);

export const userRouter = router;
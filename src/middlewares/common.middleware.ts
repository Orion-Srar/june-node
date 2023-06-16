import {NextFunction, Response} from "express";

import {IdValidator} from "../validators/id.validator";
import {ApiError} from "../errors";
import {ObjectSchema} from "joi";

class CommonMiddleware {

    public isIdValid(field: string) {
        return (req: any, res: Response, next: NextFunction) => {
            try {
                const id = req.params[field];
                const {error, value} = IdValidator.id.validate(id);
                if (error) {
                    throw new ApiError(error.message, 400)
                }
                req.validId = value;
                next();
            } catch (e) {
                next(e)
            }
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return (req: any, res: Response, next: NextFunction) => {
            try {
                const {error, value} = validator.validate(req.body)
                if (error) {
                    throw new ApiError(error.message, 400);
                }

                req.body = value;
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();

import Joi from "joi";
import {EGenders} from "../enums";
import {regexConstants} from "../constants";

export class UserValidator {
    static FirstName = Joi.string().trim().min(3).max(30).messages({
        'string.min': 'Name must be min 3 and max 30 chars',
        'string.max': 'Name must be min 3 and max 30 chars'
    });
    static age = Joi.number().min(1).max(99);
    static gender = Joi.valid(...Object.values(EGenders));
    static email = Joi.string().regex(regexConstants.EMAIL).lowercase().trim().messages({
        'string.empty': 'Must be email',
        'string.pattern.base': 'Must be email like qwe@qwe.com'
    });
    static password = Joi.string().regex(regexConstants.PASSWORD).trim();

    static create = Joi.object({
        name: this.FirstName.required(),
        age: this.age.required(),
        gender: this.gender.required(),
        email: this.email.required(),
        password: this.password.required(),

    })
    static update = Joi.object({
        name: this.FirstName,
        age: this.age,
        gender: this.gender,
    });

    static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}


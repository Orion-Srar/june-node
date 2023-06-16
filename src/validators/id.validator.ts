import Joi from "joi";

export class IdValidator{
    static id = Joi.string().regex(/^[a-fA-F0-9]{24}$/).messages({
        'string.pattern.base': 'ID is not valid, it must have 24 chars'
    })
}
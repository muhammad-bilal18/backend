import Joi from 'joi';
export function validateLogin(object) {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        code: Joi.string().length(8).pattern(/^[A-Z0-9]+$/).required()
    });

    return schema.validate(object).error;
}
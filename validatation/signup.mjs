export function validateSignup(object) {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        codeNums: Joi.number().min(1).max(100).required()
    });

    return schema.validate(object).error;
}
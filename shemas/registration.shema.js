const Joi = require('joi');

const registrationSchema = Joi.object({
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})

module.exports = {
    registrationSchema
}
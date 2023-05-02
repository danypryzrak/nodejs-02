const Joi = require("joi");
const { USER_RULE } = require("../enums");

const addUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,50}$")).required(),
  subscription: Joi.string()
    .default(USER_RULE.STARTER)
    .valid(...Object.values(USER_RULE)),
});

const addUserUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .default(USER_RULE.STARTER)
    .valid(...Object.values(USER_RULE)),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

module.exports = {
  addUserSchema,
  addUserUpdateSubscriptionSchema,
  emailSchema,
};

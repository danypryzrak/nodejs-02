const { addContactSchema } = require("./add-contact.shema");
const { updateContactSchema } = require("./update-contact.schema");
const { registrationSchema } = require("./registration.shema");
const { loginSchema } = require("./login.shema")

module.exports = {
    addContactSchema,
    updateContactSchema,
    registrationSchema,
    loginSchema
}
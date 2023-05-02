const {
  addContactSchema,
  addContactStatusUpdateSchema,
} = require("./add-contact.schema");
const {
  addUserSchema,
  addUserUpdateSubscriptionSchema,
  emailSchema,
} = require("./add-user.schema");

module.exports = {
  addUserSchema,
  addContactSchema,
  addContactStatusUpdateSchema,
  addUserUpdateSubscriptionSchema,
  emailSchema,
};

const { addContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services/contact-mapping.service");
const { createHttpException } = require("../../services");

const createContact = async (req, res, next) => {
  const user = req.user;
  const { name, email, phone, favorite } = req.body;

  const { error } = addContactSchema.validate({ name, email, phone });
  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(400, `missing required ${invalidField} field`);
  }
  const newContacts = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner: user._id,
  });

  const mappedContact = mapContactOutput(newContacts);
  res.status(201).json(mappedContact);
};

module.exports = {
  createContact,
};

const { addContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services/contact-mapping.service");
const { createHttpException } = require("../../services");

const updateOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const { error } = addContactSchema.validate({
    name,
    email,
    phone,
    favorite,
  });
  if (error) {
    throw createHttpException(400, "missing fields");
  }

  const result = await ContactModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  ).catch((error) => {
    throw createHttpException(400, error.message);
  });
  if (result === null) {
    throw createHttpException(404, "Not found");
  }

  const mappedContact = mapContactOutput(result);
  res.json(mappedContact);
};

module.exports = {
  updateOneContact,
};

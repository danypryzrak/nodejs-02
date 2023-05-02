const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services/contact-mapping.service");
const { createHttpException } = require("../../services");

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findById(id).catch((error) => {
    throw createHttpException(400, error.message);
  });
  if (!contact) {
    throw createHttpException(404, "Not found");
  }

  const mappedContact = mapContactOutput(contact);

  res.json(mappedContact);
};

module.exports = {
  getContact,
};

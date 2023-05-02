const { addContactStatusUpdateSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services/contact-mapping.service");
const { createHttpException } = require("../../services");

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const { error } = addContactStatusUpdateSchema.validate({
    favorite,
  });
  if (error) {
    throw createHttpException(400, "missing field favorite");
  }

  const result = await ContactModel.findByIdAndUpdate(
    id,
    {
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
  updateStatusContact,
};

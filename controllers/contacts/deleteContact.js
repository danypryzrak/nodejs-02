const { ContactModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await ContactModel.findByIdAndDelete(id).catch((error) => {
    throw createHttpException(400, error.message);
  });
  if (result === null) {
    throw createHttpException(404, "Not found");
  }
  res.status(200).send({ message: "contact deleted" });
};

module.exports = {
  deleteContact,
};

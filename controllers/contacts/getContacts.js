const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services/contact-mapping.service");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  let searchCriteries = { owner };

  if (favorite) {
    searchCriteries.favorite = favorite;
  }

  const contacts = await ContactModel.find(searchCriteries, null, {
    skip: (page - 1) * limit,
    limit: limit,
  }).populate("owner", "email subscription");

  const mappedContacts = contacts.map(mapContactOutput);
  res.json(mappedContacts);
};

module.exports = {
  getContacts,
};

const { UserModel } = require("../../database/models");
const { addUserUpdateSubscriptionSchema } = require("../../schemas");
const { createHttpException, mapContactOutput } = require("../../services");

const updateUserSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const { error } = addUserUpdateSubscriptionSchema.validate({
    subscription,
  });
  if (error) {
    throw createHttpException(400, "missing field subscription");
  }

  const result = await UserModel.findByIdAndUpdate(
    _id,
    {
      subscription,
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
  updateUserSubscription,
};

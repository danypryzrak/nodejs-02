const { UserModel } = require("../../database/models");
const { emailSchema } = require("../../schemas");
const { createHttpException, sendEmail } = require("../../services");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = emailSchema.validate({ email });
  if (error) {
    throw createHttpException(400, error.message);
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpException(400, "User not found");
  }
  if (user.verify) {
    throw createHttpException(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Veryfy email",
    html: `<a target="_blanc" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email`,
  };

  await sendEmail(verifyEmail);
  res.json({ message: "Verification email sent" });
};

module.exports = {
  resendVerifyEmail,
};

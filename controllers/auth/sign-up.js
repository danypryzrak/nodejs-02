const { UserModel } = require("../../database/models/user.model");
const crypto = require("crypto");
const {
  createHash,
  createHttpException,
  createJWT,
  sendEmail,
} = require("../../services");
const { addUserSchema } = require("../../schemas");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addUserSchema.validate({ email, password });
  if (error) {
    throw createHttpException(400, error.message);
  }

  const passwordHash = await createHash(password);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await UserModel.create({
    email,
    passwordHash,
    avatarURL,
    verificationToken,
  }).catch((error) => {
    throw createHttpException(409, "Email in use");
  });

  const verifyEmail = {
    to: email,
    subject: "Veryfy email",
    html: `<a target="_blanc" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email`,
  };

  await sendEmail(verifyEmail);

  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(newUser.id, { sessionKey });

  const accessJWT = createJWT({ userId: String(newUser._id), sessionKey });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = {
  signUp,
};

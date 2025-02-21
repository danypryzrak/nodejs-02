const { UserModel } = require("../../database/models/user.model");
const crypto = require("crypto");
const { createHttpException, checkHash, createJWT } = require("../../services");
const { addUserSchema } = require("../../schemas");

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = addUserSchema.validate({ email, password });
  if (error) {
    throw createHttpException(400, error.message);
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw createHttpException(404, "Email or password is wrong");
  }

  if (!user.verify) {
    throw createHttpException(401, "User not verify");
  }

  const match = await checkHash(password, user.passwordHash);

  if (!match) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(user._id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(user._id),
    sessionKey,
  });

  res.json({
    token: accessJWT,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = {
  signIn,
};

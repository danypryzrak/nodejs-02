const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");
const { updateAvatar } = require("./update-avatar");
const { updateUserSubscription } = require("./updateUserSubscription");
const { verifyEmail } = require("./verifyEmail");

module.exports = {
  signUp,
  signIn,
  logout,
  updateUserSubscription,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};

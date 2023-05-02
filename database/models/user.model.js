const mongoose = require("mongoose");
const { USER_RULE } = require("../../enums");

const userSchema = mongoose.Schema(
  {
    passwordHash: {
      type: String,
      required: [true, "Set password for user"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      index: true,
    },
    subscription: {
      type: String,
      enum: Object.values(USER_RULE),
      default: USER_RULE.STARTER,
      trim: true,
    },
    sessionKey: {
      type: String,
      default: null,
      trim: true,
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

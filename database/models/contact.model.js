const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const ContactModel = mongoose.model("contact", contactSchema);

module.exports = {
  ContactModel,
};

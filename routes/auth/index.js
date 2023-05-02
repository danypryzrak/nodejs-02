const express = require("express");
const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(authController.signUp));

router.get(
  "/verify/:verificationToken",
  controllerWrapper(authController.verifyEmail)
);

router.post("/verify", controllerWrapper(authController.resendVerifyEmail));

router.post("/login", controllerWrapper(authController.signIn));

router.get(
  "/current",
  userAuthMiddleware,
  controllerWrapper(authController.getCurrent)
);

router.post(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(authController.logout)
);

router.patch(
  "/",
  userAuthMiddleware,
  controllerWrapper(authController.updateUserSubscription)
);

router.patch(
  "/avatars",
  userAuthMiddleware,
  upload.single("avatar"),
  controllerWrapper(authController.updateAvatar)
);

module.exports = router;

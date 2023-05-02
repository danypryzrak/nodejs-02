const express = require("express");
const contactsController = require("../../controllers/contacts");
const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get(
  "/",
  userAuthMiddleware,
  controllerWrapper(contactsController.getContacts)
);

router.get(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(contactsController.getContact)
);

router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(contactsController.createContact)
);

router.delete(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(contactsController.deleteContact)
);

router.put(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(contactsController.updateOneContact)
);

router.patch(
  "/:id/favorite",
  userAuthMiddleware,
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;

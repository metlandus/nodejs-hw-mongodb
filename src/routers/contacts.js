import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import {
	getContactsController,
	getContactByIdController,
	createContactController,
    deleteContactController,
    updateContactController
} from "../controllers/contacts.js";

const router = express.Router();

router
	.route("/")
	.get(ctrlWrapper(getContactsController))
	.post(ctrlWrapper(createContactController));
router
	.route("/:contactId")
	.get(ctrlWrapper(getContactByIdController))
	.delete(ctrlWrapper(deleteContactController))
	.patch(ctrlWrapper(updateContactController));

export default router;

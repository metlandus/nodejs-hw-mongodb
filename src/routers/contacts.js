import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import {
	getContactsController,
	getContactByIdController,
	createContactController,
	deleteContactController,
	updateContactController,
} from "../controllers/contacts.js";
import createUpdateContactSchema from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValid.js";

const router = express.Router();

router
	.route("/")
	.get(ctrlWrapper(getContactsController))
	.post(
		validateBody(createUpdateContactSchema),
		ctrlWrapper(createContactController)
	);
router
	.route("/:contactId")
	.get(isValidId, ctrlWrapper(getContactByIdController))
	.delete(ctrlWrapper(deleteContactController))
	.patch(
		validateBody(createUpdateContactSchema),
		ctrlWrapper(updateContactController)
	);

export default router;

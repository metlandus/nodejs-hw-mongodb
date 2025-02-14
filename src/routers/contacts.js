import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import {
	getContactsController,
	getContactByIdController,
} from "../controllers/contacts.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContactsController));
router.get("/:contactId", ctrlWrapper(getContactByIdController));

export default router;

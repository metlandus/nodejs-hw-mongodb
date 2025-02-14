import express from "express";
import { getContacts, getContactId } from "../controllers/contacts.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactId);

export default router;
import express from "express";
import { getContacts, getContactId } from "../controllers/contacts";

export const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactId);

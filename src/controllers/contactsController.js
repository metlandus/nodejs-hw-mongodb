import { getContacts } from "../services/contacts.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getContacts();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch contacts" });
    }
};
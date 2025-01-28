import Contact from "../db/Contact.js";

export const getContacts = async () => {
    try {
        const contacts = await Contact.find();
        return contacts;
    } catch (error) {
        throw new Error("Failed to fetch contacts");
    }
};
import Contacts from "../db/Contact.js";

export async function getAllContacts() {
	const contacts = await Contacts.find();
	return contacts;
}

export async function getContactById(contactId) {
	const contact = await Contacts.findById(contactId);
	return contact;
}

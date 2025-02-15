import Contacts from "../db/Contact.js";

export async function getAllContacts() {
	const contacts = await Contacts.find();
	return contacts;
}

export async function getContactById(contactId) {
	const contact = await Contacts.findById(contactId);
	return contact;
}
export async function createContact(payload) {
	const contact = await Contacts.create(payload);
	return contact;
}

export async function deleteContact(contactId) {
	const contact = await Contacts.findOneAndDelete({ _id: contactId });
	return contact;
}

export async function updateContact(contactId, payload) {
	const rawResult = await Contacts.findByIdAndUpdate(
		{ _id: contactId },
		payload,
		{
			new: true,
			inclueResultMetadata: true,
		}
	);

	return {
		contact: rawResult,
	};
}

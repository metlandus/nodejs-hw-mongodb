import Contacts from "../db/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export async function getAllContacts({ page, perPage }) {
	const limit = perPage;
	const skip = (page - 1) * perPage;
	const contactsQuery = Contacts.find();
	const contactsCount = await Contacts.find()
		.merge(contactsQuery)
		.countDocuments();
	const contacts = await contactsQuery.skip(skip).limit(limit).exec();
	const paginationData = calculatePaginationData(
		contactsCount,
		perPage,
		page
	);

	return {
		data: contacts,
		...paginationData,
	};
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

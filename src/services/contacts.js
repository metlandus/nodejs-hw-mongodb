import Contacts from "../db/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export async function getAllContacts({
	page = 1,
	perPage = 10,
	sortOrder = SORT_ORDER.ASC,
	sortBy = "_id",
	filter = {},
}) {
	const limit = perPage;
	const skip = (page - 1) * perPage;
	const contactsQuery = Contacts.find();
	if (filter.favourite) {
		contactsQuery.where("favourite").equals(filter.favourite);
	}
	const [contactsCount, contacts] = await Promise.all([
		Contacts.find().merge(contactsQuery).countDocuments(),
		contactsQuery
			.skip(skip)
			.limit(limit)
			.sort({ [sortBy]: sortOrder })
			.exec(),
	]);
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

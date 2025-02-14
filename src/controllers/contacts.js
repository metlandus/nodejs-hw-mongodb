import { getAllContacts, getContactById } from "../services/contacts.js";

export async function getContacts(req, res) {
	const contacts = await getAllContacts();
	res.status(200).json({
		message: "Successfully found contacts",
		data: contacts,
	});
}

export async function getContactId(req, res, next) {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);

	if (!contact) {
		res.status(404).json({
			message: "Contact not found",
		});
		return;
	}
	res.status(200).json({
		message: `Successfully found contact with the id: ${contactId}`,
		data: contact,
	});
}

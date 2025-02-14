import { getAllContacts, getContactById } from "../services/contacts.js";
import createHttpError from "http-errors";


export async function getContactsController(req, res, next) {
	try {
		const contacts = await getAllContacts();
		res.status(200).json({
			message: "Successfully found contacts",
			data: contacts,
		});
	} catch (err) {
		next(err);
	}
}

export async function getContactByIdController(req, res, next) {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);

	if (!contact) {
		throw createHttpError(404, "Contact not found");
	}
	res.status(200).json({
		message: `Successfully found contact with the id: ${contactId}`,
		data: contact,
	});
}

import {
	getAllContacts,
	getContactById,
	createContact,
	deleteContact,
	updateContact,
} from "../services/contacts.js";
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

export async function createContactController(req, res, next) {
	const contact = await createContact(req.body);

	res.status(201).json({
		status: 201,
		message: `Successfully created a contact!`,
		data: contact,
	});
}

export async function deleteContactController(req, res, next) {
	const { contactId } = req.params;
	const contact = await deleteContact(contactId);

	if (!contact) {
		next(createHttpError(404, "Contact not found"));
		return;
	} else {
		res.status(200).json({
			status: 204,
			message: " Successfully deleted contact.",
			data: contact,
		});
	}
}

export async function updateContactController(req, res, next) {
	const { contactId } = req.params;
	const result = await updateContact(contactId, req.body);

	res.status(200).json({
		status: 200,
		message: "Successfully patched a contact!",
		data: result.contact,
	});
}

import {
	getAllContacts,
	getContactById,
	createContact,
	deleteContact,
	updateContact,
} from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";

export async function getContactsController(req, res, next) {
	try {
		const { page, perPage } = parsePaginationParams(req.query);
		const { sortBy, sortOrder } = parseSortParams(req.query);
		const filter = parseFilterParams(req.query);

		const contacts = await getAllContacts({
			page,
			perPage,
			sortBy,
			sortOrder,
			filter,
		});
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

	const photo = req.file;
	let photoUrl;
	if (photo) {
		if (env("ENABLE_CLOUDINARY") === "true") {
			photoUrl = await saveFileToCloudinary(photo);
		} else {
			photoUrl = await saveFileToUploadDir(photo);
		}
	}
	const contactData = { ...req.body, photoUrl, userId: req.user._id };
	const contact = await createContact(contactData);

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
	const photo = req.file;
	let photoUrl;
	if (photo) {
		if (env("ENABLE_CLOUDINARY") === "true") {
			photoUrl = await saveFileToCloudinary(photo);
		} else {
			photoUrl = await saveFileToUploadDir(photo);
		}
	}

	const result = await updateContact(contactId, {
		...req.body,
		photo: photoUrl,
	});
	if (!result) {
		next(createHttpError(404, "Contact Not Found"));
		return;
	}
	res.status(200).json({
		status: 200,
		message: "Successfully patched a contact!",
		data: result.contact,
	});
}

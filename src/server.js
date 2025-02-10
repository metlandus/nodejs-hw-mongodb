import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import dotenv from "dotenv";
import { getAllContacts, getContactById } from "./services/contacts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const logger = pino();

app.use(
	pinoHttp({
		logger,
		transport: {
			target: "pino-pretty",
		},
	})
);
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

export function setupServer() {
	app.get("/", (req, res) => {
		req.log.info("Hello World route accessed");
		res.send("Hello World!");
	});

	// Register the contacts route
	app.get("/contacts", async (req, res) => {
		const contacts = await getAllContacts();
		res.status(200).json({
			message: "Successfully found contacts",
			data: contacts,
		});
	});
	app.get("/contacts/:contactId", async (req, res, next) => {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			res.status(404).json({
				message: "Contact not found",
			});
			return;
		}
		res.status(200).json({
			message: `Successfully found contact with the id ${contactId}`,
			data: contact,
		});
	});

	// Middleware to handle non-existent paths
	app.use("*", (req, res, next) => {
		res.status(404).send({ error: "Path not found" });
	});

	app.listen(port, () => {
		logger.info(`Server is running on port ${port}`);
	});
}

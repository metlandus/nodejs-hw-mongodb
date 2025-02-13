import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import dotenv from "dotenv";
import contactRouter from "./routers/contacts";
import { notFound } from "./middlewares/notFoundHandler";

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

	app.use("/contacts", contactRouter);

	// Middleware to handle non-existent paths
	app.use("*", notFound);

	app.listen(port, () => {
		logger.info(`Server is running on port ${port}`);
	});
}

import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import dotenv from "dotenv";
import router from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

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
app.use(express.json());
app.use(cookieParser());

export function setupServer() {
	app.get("/", (req, res) => {
		req.log.info("Hello World route accessed");
		res.send("Hello World!");
	});
	app.use(router);
	app.use("*", notFoundHandler);
	app.use(errHandler);

	app.listen(port, () => {
		logger.info(`Server is running on port ${port}`);
	});
}

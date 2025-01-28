import express from "express"
import cors from "cors"
import pino from "pino"
import pinoHttp from "pino-http"
import dotenv from "dotenv"
import initMongoConnection from "./initMongoConnection.js"
import { getAllContacts } from "./controllers/contactsController.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const logger = pino();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Initialize MongoDB connection
initMongoConnection();

export function setupServer() {
    app.get("/", (req, res) => {
        req.log.info("Hello World route accessed");
        res.send("Hello World!")
    });

    // Register the contacts route
    app.get("/contacts", getAllContacts);

    // Middleware to handle non-existent paths
    app.use((req, res, next) => {
        res.status(404).send({ error: "Path not found" });
    });

    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`)
    });
}
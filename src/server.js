import express from "express"
import cors from "cors"
import pino from "pino"
import pinoHttp from "pino-http"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const logger = pino();

app.use(pinoHttp({ logger }));

app.use(cors());

export function setupServer() {
    app.get("/", (req, res) => {
        req.log.info("Hello World route accessed");
        res.send("Hello World!")
    })
    app.use((req, res, next) => {
        res.status(404).send({ message: "Not Found" })
    })
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`)
    })
}


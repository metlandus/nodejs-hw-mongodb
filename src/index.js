import { setupServer } from "./server.js";
import { initMongoConnection } from "./initMongoConnection.js";

async function startServer() {
	await initMongoConnection();
	setupServer();
}

startServer();

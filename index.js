import { setupServer } from "./src/server.js";
import { initMongoConnection } from "./src/initMongoConnection.js";

async function startServer() {
	await initMongoConnection();
	setupServer();
}

startServer();

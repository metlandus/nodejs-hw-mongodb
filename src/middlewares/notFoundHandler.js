import createError from "http-errors";
import app from "express";

export const notFound = app.use((req, res, next) => {
	const error = createError(404, "Route not found");
	next (error);
});

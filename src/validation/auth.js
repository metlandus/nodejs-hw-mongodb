import Joi from "joi";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { UsersCollection } from "../db/user.js";

export const registerUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPassword = async (payload) => {
	let entries;

	try {
		entries = jwt.verify(payload.token, env("JWT_SECRET"));
	} catch (err) {
		if (err instanceof Error) throw createHttpError(401, err.message);
		throw err;
	}

	const user = await UsersCollection.findOne({
		email: entries.email,
		_id: entries.sub,
	});

	if (!user) {
		throw createHttpError(404, "User not found");
	}

	const encryptedPassword = await bcrypt.hash(payload.password, 10);

	await UsersCollection.updateOne(
		{ _id: user._id },
		{ password: encryptedPassword }
	);
};

export const resetPasswordSchema = Joi.object({
	password: Joi.string().required(),
	token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
	code: Joi.string().required(),
});

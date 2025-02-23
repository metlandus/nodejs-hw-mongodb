import Joi from "joi";

const registerUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export default registerUserSchema;

import Joi from "joi";

const createUpdateContactSchema = Joi.object({
	name: Joi.string().min(3).max(20).required(),
	phoneNumber: Joi.string().min(3).max(20).required(),
	email: Joi.string().min(3).max(20).email(),
	isFavourite: Joi.boolean(),
	contactType: Joi.string().valid("work", "home", "personal").required(),
	parentId: Joi.string(),
});

export default createUpdateContactSchema;

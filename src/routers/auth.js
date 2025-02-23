import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import registerUserSchema from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";

const router = express.Router();

router.post(
	"/register",
	validateBody(registerUserSchema),
	ctrlWrapper(registerUserController)
);

export default router;

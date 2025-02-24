import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import {
	loginUserController,
	registerUserController,
	logoutUserController,
	refreshUserSessionController,
} from "../controllers/auth.js";

const router = express.Router();

router.post(
	"/register",
	validateBody(registerUserSchema),
	ctrlWrapper(registerUserController)
);

router.post(
	"/login",
	validateBody(loginUserSchema),
	ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));
export default router;

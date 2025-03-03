import express from "express";
import { ctrlWrapper } from "../utils/crtlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
	loginUserController,
	registerUserController,
	logoutUserController,
	refreshUserSessionController,
	requestResetEmailController,
	resetPasswordController,
	getGoogleOAuthUrlController,
	loginWithGoogleController,
} from "../controllers/auth.js";
import {
	loginUserSchema,
	registerUserSchema,
	requestResetEmailSchema,
	resetPasswordSchema,
	loginWithGoogleOAuthSchema,
} from "../validation/auth.js";

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

router.post(
	"/request-reset-email",
	validateBody(requestResetEmailSchema),
	ctrlWrapper(requestResetEmailController)
);

router.post(
	"/reset-password",
	validateBody(resetPasswordSchema),
	ctrlWrapper(resetPasswordController)
);

router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

router.post(
	"/confirm-oauth",
	validateBody(loginWithGoogleOAuthSchema),
	ctrlWrapper(loginWithGoogleController)
);

export default router;

import express from "express";
import { login, registerUser, sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { emailSchema, loginSchema, signupSchema, verifyOtpSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), registerUser);
router.post("/send-otp",validateRequest(emailSchema),sendOtp)
router.post("/verify-otp",validateRequest(verifyOtpSchema),verifyOtp)
router.post("/signin",validateRequest(loginSchema),login)

export default router;



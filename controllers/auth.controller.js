import z from "zod";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import Session from "../models/session.model.js";
import { readFile } from "fs/promises";
import { signupSchema } from "../schemas/auth.schema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { sendEmail } from "../service/email.service.js";
import { otpEmailTemplate } from "../templates/otpEmailTemplate.js";

export const registerUser = async (req, res, next) => {
  try {
    await User.insertOne(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please verify your email address.",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const fieldErrors = {};
      for (const key in error.errors) {
        const { path, message } = error.errors[key].properties;
        fieldErrors[path] = message;
      }
      return res.status(400).json({ success: false, errors: fieldErrors });
    }
    if (error.cause?.code === 11000) {
      let key = Object.keys(error.cause.keyValue)[0];
      return res
        .status(409)
        .json({ success: false, errors: { [key]: error.message } });
    }
    const err = new Error("Server error. Unable to register right now.");
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const pendingUser = await User.findOne({ email, isEmailVerified: false });
    if (!pendingUser) {
      return res
        .status(200)
        .json({ success: true, message: `OTP sent successfully to ${email}` });
    }
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      {
        upsert: true,
        runValidators: true,
      },
    );
    let html = otpEmailTemplate({ appName: process.env.APP_NAME, otp });
    await sendEmail({
      to: email,
      subject: "Your Techflow Verification Code",
      html,
    });
    res
      .status(200)
      .json({ success: true, message: `OTP sent successfully to ${email}` });
  } catch (error) {
    console.log(error);
    const err = new Error("Unable to send OTP email at the moment.");
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpDoc = await Otp.findOneAndDelete({ email, otp });
    if (!otpDoc) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    const user = await User.findOne({ email, isEmailVerified: false });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }
    user.isEmailVerified = true;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    const err = new Error(
      "Unable to process OTP verification right now. Please try again later",
    );
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, isRememberMe } = req.body;
    const user = await User.findOne({ email, isEmailVerified: true }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await user.verifyPassword(password);
    console.log({ isPasswordCorrect });
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const sessionDuration = isRememberMe
      ? 60 * 60 * 24 * 30 * 1000
      : 60 * 60 * 24 * 7 * 1000;
    const sessionId = req.cookies.sid;
    await Session.findByIdAndDelete(sessionId);

    const session = await Session.insertOne({
      userId: user._id,
      expiresAt: Date.now() + sessionDuration,
    });

    await res.cookie("sid", session.id, {
      httpOnly: true,
      secure: true,
      maxAge: sessionDuration,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {}
};

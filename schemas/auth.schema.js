import * as z from "zod";

export const emailFieldSchema = z
  .string("Email is required")
  .trim()
  .max(255, "Invalid email address")
  .email("Invalid email address");

export const signupSchema = z
  .object({
    name: z
      .string("Name is required")
      .trim()
      .min(3, "Name must be atleast 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    username: z
      .string("Username is required")
      .trim()
      .min(3, "Username must be atleast 3 characters")
      .max(50, "Username must not exceed 50 characters")
      .regex(
        /^[A-Za-z0-9._]+$/,
        "Usernames can only include numbers, letters, underscores and period",
      ),
    email: emailFieldSchema,
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters"),
    confirmPassword: z.any().optional(),
  })
  .refine(
    (data) => {
      console.log(data);
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do  not match",
      path: ["confirmPassword"],
    },
  );

export const emailSchema = z.object({
  email: emailFieldSchema,
});

export const verifyOtpSchema = z.object({
  email: emailFieldSchema,
  otp: z.string("Invalid or expired OTP").length(6,"Invalid or expired OTP"),
});

export const loginSchema = z.object({
  email: emailFieldSchema,
  password: z.string().max(64),
  isRememberMe: z.coerce.boolean().optional(),
});

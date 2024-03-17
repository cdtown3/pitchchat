import { z } from "zod";

export const userSetupSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(40, "Max length is 40 characters"),
    lastName: z.string().min(1, "Last name is required").max(40, "Max length is 40 characters"),
    username: z.string().min(1, "Username required").max(32, "Max length is 32 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters").max(64, "Maximum 64 characters"),
    passwordConfirmation: z.string().min(8, "Minimum 8 characters").max(64, "Maximum 64 characters")
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
});
'use server'

import { z } from "zod"
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { userSetupSchema } from "@/schemas/user-setup-schema";
import { hashPassword } from "@/lib/passwordUtils";
import { VerificationType } from "@prisma/client";
import { generateSecureCode } from "@/lib/generate-verification-code";

export const handleSignUp = async (data: z.infer<typeof userSetupSchema>) => {
    const validatedFields = userSetupSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            status: 400,
            message: "Bad Request",
            errors: validatedFields.error.errors
        };
    }

    const { password, ...userData } = validatedFields.data;
    
    try {
        const currUser = await getCurrentUser();

        if (currUser) {
            return {
                status: 401,
                message: "Unauthorized request. You are already logged in."
            };
        }

        const passwordHash = await hashPassword(password);
        const verificationCode = generateSecureCode();

        const user = await db.user.create({
            data: {
                password: passwordHash,
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                verifications: {
                    create: {
                        contact: userData.email,
                        type: VerificationType.EMAIL,
                        code: verificationCode
                    }
                }
            } 
        });

        // NOTE: Send verification email

        return {
            status: 200,
            message: "Success"
        };

    } catch (error) {
        // NOTE: log error
        return {
            status: 500,
            message: "An unexpected error occurred."
        };
    }
}
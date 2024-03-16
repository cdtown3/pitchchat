'use server'

import { z } from "zod"
import { userSetupSchema } from "./page";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";


export const handleSignUp = async (data: z.infer<typeof userSetupSchema>) => {
    const validatedFields = userSetupSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            status: 400,
            message: "Bad Request",
            errors: validatedFields.error.errors
        };
    }
    
    try {
        const curUser = await currentUser();

        if (curUser) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }

        const user = await db.user.create({
            data: {
                password: validatedFields.data.password,
                username: validatedFields.data.username,
                email: validatedFields.data.email,
                firstName: validatedFields.data.firstName,
                lastName: validatedFields.data.lastName
            }        
        });

        return {
            status: 200,
            message: "Success",
            user
        };
    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}
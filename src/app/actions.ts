'use server'

import { z } from "zod"
import { userSetupSchema } from "./(auth)/(routes)/sign-up/[[...sign-up]]/page"

export const handleSignUp = async (data: z.infer<typeof userSetupSchema>) => {
    return {
        status: 200,
        message: "Success",
        data
    };
}
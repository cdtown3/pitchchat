"use client"

import { handleSignUp } from "./signup-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSetupSchema } from "@/schemas/user-setup-schema";

export default function SignUp() {
    const form = useForm<z.infer<typeof userSetupSchema>>({
        resolver: zodResolver(userSetupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })
    
    const onSubmit = async (values: z.infer<typeof userSetupSchema>) => {
        const res = await handleSignUp(values);

        console.log(res);
    }

    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>We'll send you an email to confirm who you are.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            
                    </CardContent>
                    <CardFooter className="flex">
                        <Button variant="outline">Sign In Instead</Button>
                        <Button className="ml-auto">Sign Up</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
     );
}
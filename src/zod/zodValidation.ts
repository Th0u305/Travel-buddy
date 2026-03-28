import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email("Invalid email").min(10, "Email must be at least 10 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name : z.string().min(3, "Name must be at least 3 characters long")
})

export type formValidation = z.infer<typeof formSchema>
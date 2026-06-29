import {z} from "zod";

export const createUserSchema=z.object({
    email:z.string().email('Invalid email address'),
    name:z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters long'),
});

export type CreateUserDto=z.infer<typeof createUserSchema>;
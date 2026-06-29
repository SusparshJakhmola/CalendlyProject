import {z} from "zod";

export const createUserSchema=z.object({
    email:z.string().email('Invalid email address'),
    name:z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters long'),
});

export const updateUserSchema=z.object({
    email:z.string().email('Invalid email address').optional(),
    name:z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters long').optional(),
}).refine((data)=>data.email !== undefined || data.name !== undefined, {
    message: 'At least one field (email or name) must be provided for update',
});
export type CreateUserDto=z.infer<typeof createUserSchema>;
export type UpdateUserDto=z.infer<typeof updateUserSchema>;
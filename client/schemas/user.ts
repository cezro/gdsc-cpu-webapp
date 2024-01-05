import { z } from 'zod';

export const userSchema = z.object({
  fname: z
    .string()
    .min(1, { message: 'Missing First Name' })
    .max(255, 'Reached Character Limit'),
  lname: z
    .string()
    .min(1, { message: 'Missing Last Name' })
    .max(255, 'Reached Character Limit'),
  email: z.string().min(1, { message: 'Missing Email' }).email('Invalid email'),
  password: z.string().min(1, { message: 'Missing Password' }),
});

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Missing Email' }).email('Invalid email'),
  password: z.string().min(1, { message: 'Missing Password' }),
});

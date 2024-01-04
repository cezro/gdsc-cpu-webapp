import { z } from 'zod';

export const userSchema = z.object({
  fname: z.string().min(1, { message: 'Missing First Name' }),
  lname: z.string().min(1, { message: 'Missing Last Name' }),
  email: z.string().min(1, { message: 'Missing Email' }).email('Invalid email'),
  password: z.string().min(1, { message: 'Missing Password' }),
});

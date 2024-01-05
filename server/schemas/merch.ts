import { z } from 'zod';

export const merchSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Missing Event Name' })
    .max(255, { message: 'Reached Character Limit' }),
  description: z
    .string()
    .min(1, { message: 'Missing Description' })
    .max(255, { message: 'Reached Character Limit' }),
  price: z.number().min(1).int().nonnegative(),
  image: z.string().min(1, { message: 'Image not found' }),
});

import { z } from 'zod';

export const merchSchema = z.object({
  name: z.string().min(1, { message: 'Missing Event Name' }),
  description: z.string().min(1, { message: 'Missing Description' }),
  price: z.number().min(1),
});

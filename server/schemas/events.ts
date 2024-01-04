import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1, { message: 'Missing Event Name' }),
  description: z.string().min(1, { message: 'Missing Description' }),
  date: z.date(),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/)
    .refine((timeString) => {
      const [hour, minute, second] = timeString.split(':').map(Number);
      return (
        hour >= 0 &&
        hour <= 23 &&
        minute >= 0 &&
        minute <= 59 &&
        second >= 0 &&
        second <= 59
      );
    }, 'Invalid time format. Please use HH:MM:SS format and ensure valid time values.'),
  location: z.string().min(1, { message: 'Missing Location' }),
});

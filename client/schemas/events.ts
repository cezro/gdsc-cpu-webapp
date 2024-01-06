import { z } from 'zod';

export const eventSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Missing Event Name' })
    .max(255, 'Reached Character Limit'),
  description: z
    .string()
    .min(1, { message: 'Missing Description' })
    .max(255, 'Reached Character Limit'),
  date: z.string().refine((value) => {
    const parts = value.split('/');

    if (parts.length !== 3) {
      throw new Error('Invalid date format. Please use MM/DD/YYYY.');
    }

    const [month, day, year] = parts.map(Number);
    return (
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      year >= 1000 &&
      year <= 9999
    );
  }, 'Invalid date format. Please use MM/DD/YYYY.'),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/)
    .refine((timeString: string) => {
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
  location: z
    .string()
    .min(1, { message: 'Missing Location' })
    .max(255, 'Reached Character Limit'),
});

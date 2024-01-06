/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export default function validate(schema: z.ZodTypeAny, data: any) {
  try {
    const validatedData = schema.parse(data);
    return { valid: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors };
    }
  }
}

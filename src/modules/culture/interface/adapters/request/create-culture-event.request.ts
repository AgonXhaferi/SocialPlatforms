import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCultureEventRequestSchema = z.object({
  name: z.string().min(1).max(60),
  culture: z.string().min(1).max(60),
  description: z.string().min(1),
  longitude: z.number(),
  latitude: z.number(),
  startDate: z.dateString().cast(),
  endDate: z.dateString().cast(),
});

export class CreateCultureEventRequest extends createZodDto(
  createCultureEventRequestSchema,
) {}

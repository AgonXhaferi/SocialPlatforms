import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCultureRequestSchema = z.object({
  name: z.string().min(1).max(50),
  location: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
});

export class CreateCultureRequest extends createZodDto(
  createCultureRequestSchema,
) {}

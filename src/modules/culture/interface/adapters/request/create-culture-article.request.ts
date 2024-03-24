import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCultureArticleRequestSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1),
  culture: z.string().min(1).max(60),
});

export class CreateCultureArticleRequest extends createZodDto(
  createCultureArticleRequestSchema,
) {}

import { z } from 'zod';

const createCultureRequestSchema = z.object({
  name: z.string().min(1).max(50),
  location: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
});

export type CreateCultureRequest = z.TypeOf<typeof createCultureRequestSchema>;

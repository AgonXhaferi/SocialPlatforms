import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCultureSubscriptionRequestSchema = z.object({
  userId: z.string().uuid(),
  cultureId: z.string().min(1).max(50),
});

export class CreateCultureSubscriptionRequest extends createZodDto(
  createCultureSubscriptionRequestSchema,
) {}

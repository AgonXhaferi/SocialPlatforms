import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const createUserMessageSchema = z.object({
  chatId: z.string().uuid(),
  senderId: z.string().uuid(),
  content: z.string().min(1),
});

export class CreateUserMessageRequest extends createZodDto(
  createUserMessageSchema,
) {}

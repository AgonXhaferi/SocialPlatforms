import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const createUserChatRequestSchema = z.object({
  userOneId: z.string().uuid(),
  userTwoId: z.string().uuid(),
});

export class CreateUserChatRequest extends createZodDto(
  createUserChatRequestSchema,
) {}

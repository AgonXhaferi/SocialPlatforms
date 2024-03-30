import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createUserFollowingRequestSchema = z.object({
  followerId: z.string().uuid(),
  followeeId: z.string().uuid(),
});

export class CreateUserFollowingRequest extends createZodDto(
  createUserFollowingRequestSchema,
) {}

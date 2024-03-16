import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createUserRequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  userName: z.string().min(1).max(50),
  email: z.string().email(),
  age: z.number().min(1),
  country: z.string().min(1).max(50),
  postalCode: z.string().min(1).max(10),
  street: z.string().min(1).max(50),
  culture: z.string().min(1).max(50),
});

export class CreateUserRequest extends createZodDto(createUserRequestSchema) {}

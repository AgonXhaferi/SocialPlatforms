import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  // createUser(); TODO: We'll make sense of this later on.
}

import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { Err, Ok, Result } from 'oxide.ts';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { AggregateID } from '@libs/ddd';
import { FullName } from '@modules/user/domain/value-objects/full-name.value-object';
import { UserRoles } from '@modules/user/domain/props/user.types';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async createUser(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const user = UserEntity.create({
      id: command.id,
      age: command.age,
      address: new Address({
        country: command.country,
        street: command.street,
        postalCode: command.postalCode,
      }),
      userName: command.userName,
      email: command.email,
      fullName: new FullName({
        lastName: command.lastName,
        firstName: command.name,
      }),
      role: UserRoles.moderator,
      culture: command.culture,
    });

    try {
      const userId = await this.userRepo.create(user);
      return Ok(userId);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}

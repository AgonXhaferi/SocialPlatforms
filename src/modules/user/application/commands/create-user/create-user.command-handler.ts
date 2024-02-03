import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const user = UserEntity.create({
      email: command.email,
      address: new Address({
        country: command.country,
        street: command.street,
        postalCode: command.postalCode,
      }),
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

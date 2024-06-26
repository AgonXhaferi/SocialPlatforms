import { CreateUserCommand } from '@modules/user/application/commands/create-user.command';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateUserService } from '@modules/user/application/services/create-user.service';
import { CreateCultureSubscriptionCommand } from '@modules/culture/application/commands/create-culture-subscription.command';
import { Transactional } from 'typeorm-transactional';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(
    protected readonly createUserService: CreateUserService,
    private readonly commandBus: CommandBus,
  ) {}

  @Transactional()
  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const result = await this.createUserService.createUser(command);

    if (result.ok()) {
      const createCultureSubscriptionResult: Result<
        AggregateID,
        ExceptionBase
      > = await this.commandBus.execute(
        new CreateCultureSubscriptionCommand({
          userId: command.id,
          cultureId: command.culture,
          isPrimary: true,
        }),
      );

      if (createCultureSubscriptionResult.isErr()) {
        return Err(createCultureSubscriptionResult.unwrapErr());
      }
    }

    return result;
  }
}

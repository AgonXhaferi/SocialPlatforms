import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserFollowingCommand } from '@modules/user/application/commands/create-user-following.command';
import { CreateUserFollowingService } from '@modules/user/application/services/create-user-following.service';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';

@CommandHandler(CreateUserFollowingCommand)
export class CreateUserFollowingCommandHandler implements ICommandHandler {
  constructor(private createUserFollowingService: CreateUserFollowingService) {}

  execute(
    command: CreateUserFollowingCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createUserFollowingService.createUserFollowing(command);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCultureSubscriptionCommand } from '@modules/culture/application/commands/create-culture-subscription.command';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureSubscriptionsService } from '@modules/culture/application/services/culture-subscriptions/create-culture-subscriptions.service';

@CommandHandler(CreateCultureSubscriptionCommand)
export class CreateCultureSubscriptionCommandHandler
  implements ICommandHandler
{
  constructor(
    private readonly createCultureSubscriptionService: CreateCultureSubscriptionsService,
  ) {}

  execute(
    command: CreateCultureSubscriptionCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createCultureSubscriptionService.createCultureSubscription(
      command,
    );
  }
}

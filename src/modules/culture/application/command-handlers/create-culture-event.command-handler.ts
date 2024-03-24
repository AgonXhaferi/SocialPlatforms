import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCultureEventCommand } from '@modules/culture/application/commands/create-culture-event.command';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureEventsService } from '@modules/culture/application/services/culture-events/create-culture-events.service';

@CommandHandler(CreateCultureEventCommand)
export class CreateCultureEventCommandHandler implements ICommandHandler {
  constructor(
    private readonly createCultureEventsService: CreateCultureEventsService,
  ) {}

  async execute(
    command: CreateCultureEventCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createCultureEventsService.createCultureEvent(command);
  }
}

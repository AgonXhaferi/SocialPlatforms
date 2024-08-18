import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_EVENTS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureEventsRepositoryPort } from '@modules/culture/application/ports/culture-events.repository.port';
import { CultureEventMapper } from '@modules/culture/mapper/culture-event.mapper';
import { CultureEventResponse } from '@modules/culture/interface/response/culture-event.response';
import { FindCultureEventByNameQuery } from '@modules/culture/application/queries/culture-events/find-culture-event-by-name.query';

//TODO: Test this out along with the find artciles by name query.
@QueryHandler(FindCultureEventByNameQuery)
export class FindCultureEventByNameQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_EVENTS_REPOSITORY)
    private readonly cultureEventsRepositoryPort: CultureEventsRepositoryPort,
    private readonly cultureEventsMapper: CultureEventMapper,
  ) {}

  async execute(
    findLatestCultureEventsQuery: FindCultureEventByNameQuery,
  ): Promise<CultureEventResponse[]> {
    const queriedCultureEvents =
      await this.cultureEventsRepositoryPort.findEventByName(
        findLatestCultureEventsQuery.eventName,
        findLatestCultureEventsQuery.cultureName,
      );

    return queriedCultureEvents.map(this.cultureEventsMapper.toResponse);
  }
}

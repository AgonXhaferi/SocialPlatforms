import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_EVENTS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { FindLatestCultureEventsQuery } from '@modules/culture/application/queries/find-latest-culture-events.query';
import { CultureEventsRepositoryPort } from '@modules/culture/application/ports/culture-events.repository.port';
import { CultureEventMapper } from '@modules/culture/mapper/culture-event.mapper';
import { CultureEventResponse } from '@modules/culture/interface/response/culture-event.response';

@QueryHandler(FindLatestCultureEventsQuery)
export class FindLatestCultureEventsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_EVENTS_REPOSITORY)
    private readonly cultureEventsRepositoryPort: CultureEventsRepositoryPort,
    private readonly cultureEventsMapper: CultureEventMapper,
  ) {}

  async execute(
    findLatestCultureEventsQuery: FindLatestCultureEventsQuery,
  ): Promise<CultureEventResponse[]> {
    const topCultureArticles =
      await this.cultureEventsRepositoryPort.findNLatestEvents(
        findLatestCultureEventsQuery.numberOfEvents,
      );

    return topCultureArticles.map(this.cultureEventsMapper.toResponse);
  }
}

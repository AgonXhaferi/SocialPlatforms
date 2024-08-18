import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureEventsEntity } from '@modules/culture/domain/entities/culture-events.entity';

export interface CultureEventsRepositoryPort
  extends RepositoryPort<CultureEventsEntity, AggregateID> {
  findNLatestEvents(
    numberOfEvents: number,
    cultureName: string,
  ): Promise<CultureEventsEntity[]>;
}

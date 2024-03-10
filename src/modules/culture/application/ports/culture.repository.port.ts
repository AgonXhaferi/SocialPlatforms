import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureEntity } from '@modules/culture/domain/entities/culture.entity';

export interface CultureRepositoryPort
  extends RepositoryPort<CultureEntity, AggregateID> {}

import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureSubscriptionsEntity } from '@modules/culture/domain/entities/culture-subscriptions.entity';

export interface CultureSubscriptionsRepositoryPort
  extends RepositoryPort<CultureSubscriptionsEntity, AggregateID> {}

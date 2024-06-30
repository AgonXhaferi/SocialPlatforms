import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureSubscriptionsEntity } from '@modules/culture/domain/entities/culture-subscriptions.entity';
import { UserSubscriptionDto } from '@modules/culture/infrastructure/dto/user-subscription.dto';

export interface CultureSubscriptionsRepositoryPort
  extends RepositoryPort<CultureSubscriptionsEntity, AggregateID> {
  findUsersByPrimaryCultureId(cultureId: string): Promise<string[]>;

  isUserSubscribedToCulture(
    userSubscriptionDto: UserSubscriptionDto,
  ): Promise<boolean>;
}

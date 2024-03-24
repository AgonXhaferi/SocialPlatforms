import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_SUBSCRIPTIONS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureSubscriptionsRepositoryPort } from '@modules/culture/application/ports/culture-subscriptions.repository.port';
import { CreateCultureSubscriptionCommand } from '@modules/culture/application/commands/create-culture-subscription.command';
import { CultureSubscriptionsEntity } from '@modules/culture/domain/entities/culture-subscriptions.entity';
import { Ok } from 'oxide.ts';

@Injectable()
export class CreateCultureSubscriptionsService {
  constructor(
    @Inject(CULTURE_SUBSCRIPTIONS_REPOSITORY)
    protected readonly cultureSubscriptionsRepository: CultureSubscriptionsRepositoryPort,
  ) {}

  async createCultureSubscription(
    createCultureSubscriptionRequest: CreateCultureSubscriptionCommand,
  ) {
    const cultureSubscription = CultureSubscriptionsEntity.create({
      cultureId: createCultureSubscriptionRequest.cultureId,
      isPrimary: true,
      userId: createCultureSubscriptionRequest.userId,
    });

    const createdCultureSubscriptionId =
      await this.cultureSubscriptionsRepository.create(cultureSubscription);

    return Ok(createdCultureSubscriptionId);
  }
}

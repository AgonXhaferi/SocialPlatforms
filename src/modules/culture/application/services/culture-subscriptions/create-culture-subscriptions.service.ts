import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_SUBSCRIPTIONS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureSubscriptionsRepositoryPort } from '@modules/culture/application/ports/culture-subscriptions.repository.port';
import { CreateCultureSubscriptionCommand } from '@modules/culture/application/commands/create-culture-subscription.command';
import { CultureSubscriptionsEntity } from '@modules/culture/domain/entities/culture-subscriptions.entity';
import { Err, Ok } from 'oxide.ts';
import { ArgumentInvalidException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';

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

    try {
      const createdCultureSubscriptionId =
        await this.cultureSubscriptionsRepository.create(cultureSubscription);

      return Ok(createdCultureSubscriptionId);
    } catch (error) {
      if (error instanceof ArgumentInvalidException) {
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

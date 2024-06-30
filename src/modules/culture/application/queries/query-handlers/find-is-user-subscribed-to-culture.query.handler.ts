import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_SUBSCRIPTIONS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureSubscriptionsRepositoryPort } from '@modules/culture/application/ports/culture-subscriptions.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';
import { FindIsUserSubscribedToCultureQuery } from '@modules/culture/application/queries/find-is-user-subscribed-to-culture.query';

@QueryHandler(FindIsUserSubscribedToCultureQuery)
export class FindIsUserSubscribedToCultureQueryHandler
  implements IQueryHandler
{
  constructor(
    @Inject(CULTURE_SUBSCRIPTIONS_REPOSITORY)
    private readonly cultureSubscriptionsRepository: CultureSubscriptionsRepositoryPort,
  ) {}

  async execute(
    findIsUserSubscribedToCultureQuery: FindIsUserSubscribedToCultureQuery,
  ): Promise<Result<boolean, ExceptionBase>> {
    try {
      const isUserSubscribedToCulture =
        await this.cultureSubscriptionsRepository.isUserSubscribedToCulture({
          cultureId: findIsUserSubscribedToCultureQuery.cultureId,
          userId: findIsUserSubscribedToCultureQuery.userId,
        });

      return Ok(isUserSubscribedToCulture);
    } catch (error) {
      if (error instanceof NotFoundException) {
        //TODO: Think about this more thoroughly.
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

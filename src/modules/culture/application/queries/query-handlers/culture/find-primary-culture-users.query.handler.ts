import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_SUBSCRIPTIONS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';
import { FindPrimaryCultureUsersQuery } from '@modules/culture/application/queries/culture/find-primary-culture-users.query';
import { CultureSubscriptionsRepositoryPort } from '@modules/culture/application/ports/culture-subscriptions.repository.port';
import { CultureSubscriptionsMapper } from '@modules/culture/mapper/culture-subscriptions.mapper';

@QueryHandler(FindPrimaryCultureUsersQuery)
export class FindPrimaryCultureUsersQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_SUBSCRIPTIONS_REPOSITORY)
    private readonly cultureSubscriptionsRepository: CultureSubscriptionsRepositoryPort,
    private readonly cultureSubscriptionsMapper: CultureSubscriptionsMapper,
  ) {}

  async execute(
    findPrimaryCultureUsersQuery: FindPrimaryCultureUsersQuery,
  ): Promise<Result<string[], ExceptionBase>> {
    try {
      const userIds =
        await this.cultureSubscriptionsRepository.findUsersByPrimaryCultureId(
          findPrimaryCultureUsersQuery.primaryCultureName,
        );

      return Ok(userIds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

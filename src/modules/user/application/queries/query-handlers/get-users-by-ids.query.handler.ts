import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';
import { FindPrimaryCultureUsersQuery } from '@modules/culture/application/queries/find-primary-culture-users.query';
import { GetUserByIdsQuery } from '@modules/user/application/queries/queries/get-users-by-ids.query';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';

@QueryHandler(GetUserByIdsQuery)
export class GetUsersByIdsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(
    getUsersByIdsQuery: GetUserByIdsQuery,
  ): Promise<Result<string[], ExceptionBase>> {
    try {
      const userIds = await this.userRepositoryPort.findAll();
      return Ok(userIds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

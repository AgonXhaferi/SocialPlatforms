import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { FindUsersByIdsQuery } from '@modules/user/application/query/queries/find-users-by-ids.query';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';
import { UserResponseDto } from '@modules/user/interface/adapters/response/user.response.dto';
import { UserMapper } from '@modules/user/mapper/user.mapper';
import { UserDoesntExistError } from '@modules/user/domain/errors/user-doesnt-exist.error';

@QueryHandler(FindUsersByIdsQuery)
export class FindUsersByIdsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(
    getUsersByIdsQuery: FindUsersByIdsQuery,
  ): Promise<Result<UserResponseDto[], ExceptionBase>> {
    try {
      const users = await this.userRepositoryPort.findUsersByIds(
        getUsersByIdsQuery.userIds,
      );

      const userResponseDtos = users.map(this.userMapper.toResponse);

      return Ok(userResponseDtos);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return Err(new UserDoesntExistError(error));
      }
    }
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '@modules/user/application/query/queries/find-user-by-id.query';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';
import { UserMapper } from '@modules/user/mapper/user.mapper';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { UserDoesntExistError } from '@modules/user/domain/errors/user-doesnt-exist.error';
import { UserResponseDto } from '@modules/user/interface/adapters/response/user.response.dto';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler
  implements IQueryHandler<FindUserByIdQuery>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(
    query: FindUserByIdQuery,
  ): Promise<Result<UserResponseDto, ExceptionBase>> {
    try {
      const user = await this.userRepositoryPort.findOneById(query.userId);

      const userResponse = this.userMapper.toResponse(user);

      return Ok(userResponse);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return Err(new UserDoesntExistError(error));
      }
    }
  }
}

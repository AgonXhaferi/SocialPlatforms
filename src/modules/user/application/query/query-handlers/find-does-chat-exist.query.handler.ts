import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDoesChatExistQuery } from '@modules/user/application/query/queries/find-does-chat-exist.query';
import { Inject } from '@nestjs/common';
import { USER_CHAT_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserChatRepositoryPort } from '@modules/user/application/ports/user-chat.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { AggregateID } from '@libs/ddd';

@QueryHandler(FindDoesChatExistQuery)
export class FindDoesChatExistQueryHandler
  implements IQueryHandler<FindDoesChatExistQuery>
{
  constructor(
    @Inject(USER_CHAT_REPOSITORY)
    private readonly userChatRepositoryPort: UserChatRepositoryPort,
  ) {}

  async execute(
    query: FindDoesChatExistQuery,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const doesChatExist = await this.userChatRepositoryPort.doesChatExist({
      userOneId: query.userOneId,
      userTwoId: query.userTwoId,
    });

    if (doesChatExist) {
      return Ok(doesChatExist.id);
    } else return Err(new NotFoundException());
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDoesChatExistQuery } from '@modules/user/application/queries/queries/find-does-chat-exist.query';
import { Inject } from '@nestjs/common';
import { USER_CHAT_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserChatRepositoryPort } from '@modules/user/application/ports/user-chat.repository.port';

@QueryHandler(FindDoesChatExistQuery)
export class FindDoesChatExistQueryHandler
  implements IQueryHandler<FindDoesChatExistQuery>
{
  constructor(
    @Inject(USER_CHAT_REPOSITORY)
    private readonly userChatRepositoryPort: UserChatRepositoryPort,
  ) {}

  async execute(query: FindDoesChatExistQuery): Promise<boolean> {
    return await this.userChatRepositoryPort.doesChatExist({
      userOneId: query.userOneId,
      userTwoId: query.userTwoId,
    });
  }
}

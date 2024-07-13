import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserChatByIdQuery } from '@modules/user/application/queries/queries/find-user-chat-by-id.query';
import { UserChatRepositoryPort } from '@modules/user/application/ports/user-chat.repository.port';
import { USER_CHAT_REPOSITORY } from '@modules/user/user.di-tokens';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { UserChatMapper } from '@modules/user/mapper/user-chat.mapper';
import { UserChatResponse } from '@modules/user/interface/adapters/response/user-chat.response';

@QueryHandler(FindUserChatByIdQuery)
export class FindUserChatByIdQueryHandler
  implements IQueryHandler<FindUserChatByIdQuery>
{
  constructor(
    @Inject(USER_CHAT_REPOSITORY)
    private readonly userChatRepositoryPort: UserChatRepositoryPort,
    private readonly userChatMapper: UserChatMapper,
  ) {}

  async execute(
    query: FindUserChatByIdQuery,
  ): Promise<Result<UserChatResponse, ExceptionBase>> {
    //TODO: Eventually define a proper response type.
    const userChat = await this.userChatRepositoryPort.findOneById(
      query.chatId,
    );

    const userChatResponse = this.userChatMapper.toResponse(userChat);

    return Ok(userChatResponse);
    try {
    } catch (error) {
      //TODO: Define better error handling

      return Err(error);
    }
  }
}

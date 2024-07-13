import { Inject, Injectable } from '@nestjs/common';
import { USER_CHAT_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserChatRepositoryPort } from '@modules/user/application/ports/user-chat.repository.port';
import { CreateUserChatCommand } from '@modules/user/application/commands/create-user-chat.command';
import { UserChatEntity } from '@modules/user/domain/entities/user-chat.entity';
import { Ok, Result } from 'oxide.ts';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { AggregateID } from '@libs/ddd';

@Injectable()
export class CreateUserChatService {
  constructor(
    @Inject(USER_CHAT_REPOSITORY)
    protected readonly userChatRepo: UserChatRepositoryPort,
  ) {}

  async createUserChat(
    command: CreateUserChatCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const userChatEntity = UserChatEntity.create({
      userOneId: command.userOneId,
      userTwoId: command.userTwoId,
    });

    try {
      const chatId = await this.userChatRepo.create(userChatEntity);

      return Ok(chatId);
    } catch (error) {
      if (error instanceof ConflictException) {
        //TODO: Think of what kind of exceptions could occur here, and define the exception/error handling appropriately.
      }
      throw error;
    }
  }
}

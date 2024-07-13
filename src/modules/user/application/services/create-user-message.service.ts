import { Inject, Injectable } from '@nestjs/common';
import { USER_MESSAGE_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserMessageRepositoryPort } from '@modules/user/application/ports/user-message.repository.port';
import { Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { CreateUserMessageCommand } from '@modules/user/application/commands/create-user-message.command';
import { UserMessageEntity } from '@modules/user/domain/entities/user-message.entity';

@Injectable()
export class CreateUserMessageService {
  constructor(
    @Inject(USER_MESSAGE_REPOSITORY)
    protected readonly userMessageRepositoryPort: UserMessageRepositoryPort,
  ) {}

  async createUserMessage(
    createUserMessageCommand: CreateUserMessageCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const userMessageEntity = UserMessageEntity.create({
      chatId: createUserMessageCommand.chatId,
      content: createUserMessageCommand.content,
      senderId: createUserMessageCommand.senderId,
      timestamp: createUserMessageCommand.timestamp,
    });

    try {
      const userMessageId =
        await this.userMessageRepositoryPort.create(userMessageEntity);

      return Ok(userMessageId);
    } catch (error) {
      if (error instanceof ConflictException) {
        //TODO: Think of what kind of exceptions could occur here, and define the exception/error handling appropriately.
      }
      throw error;
    }
  }
}

import { Mapper } from '@libs/ddd';
import { UserMessageEntity } from '@modules/user/domain/entities/user-message.entity';
import { UserMessagePersistenceEntity } from '@modules/user/database/entities/user-message.persistence.entity';
import { Injectable } from '@nestjs/common';
import { UserMessageResponse } from '@modules/user/interface/adapters/response/user-message.response';

@Injectable()
export class UserMessageMapper
  implements
    Mapper<
      UserMessageEntity,
      UserMessagePersistenceEntity,
      UserMessageResponse
    >
{
  toPersistence(entity: UserMessageEntity): UserMessagePersistenceEntity {
    const record = entity.getProps();

    return new UserMessagePersistenceEntity(
      record.chatId,
      record.senderId,
      record.content,
      record.timestamp,
    );
  }

  toDomain(record: UserMessagePersistenceEntity): UserMessageEntity {
    return new UserMessageEntity({
      id: record.id,
      props: {
        chatId: record.chatId,
        content: record.content,
        senderId: record.senderId,
        timestamp: record.timestamp,
      },
    });
  }

  toResponse(entity: UserMessageEntity): UserMessageResponse {
    return new UserMessageResponse({
      chatId: entity.getProps().chatId,
      senderId: entity.getProps().senderId,
      content: entity.getProps().content,
      timestamp: entity.getProps().timestamp,
    });
  }
}

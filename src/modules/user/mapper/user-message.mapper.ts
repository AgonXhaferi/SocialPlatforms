import { Mapper } from '@libs/ddd';
import { UserMessageEntity } from '@modules/user/domain/entities/user-message.entity';
import { UserMessagePersistenceEntity } from '@modules/user/database/entities/user-message.persistence.entity';

export class UserMessageMapper
  implements Mapper<UserMessageEntity, UserMessagePersistenceEntity>
{
  toPersistence(entity: UserMessageEntity): UserMessagePersistenceEntity {
    const record = entity.getProps();

    return new UserMessagePersistenceEntity(
      record.chatId,
      record.senderId,
      record.content,
    );
  }

  toDomain(record: UserMessagePersistenceEntity): UserMessageEntity {
    return new UserMessageEntity({
      id: record.id,
      props: {
        chatId: record.chatId,
        content: record.content,
        senderId: record.senderId,
      },
    });
  }

  toResponse(entity: UserMessageEntity) {
    throw new Error('Method not implemented.');
  }
}

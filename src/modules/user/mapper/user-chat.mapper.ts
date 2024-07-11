import { Mapper } from '@libs/ddd';
import { UserChatEntity } from '@modules/user/domain/entities/user-chat.entity';
import { UserChatPersistenceEntity } from '@modules/user/database/entities/user-chat.persistence.entity';

export class UserChatMapper
  implements Mapper<UserChatEntity, UserChatPersistenceEntity>
{
  toPersistence(entity: UserChatEntity): UserChatPersistenceEntity {
    const record = entity.getProps();

    return new UserChatPersistenceEntity(record.userOneId, record.userTwoId);
  }

  toDomain(record: UserChatPersistenceEntity): UserChatEntity {
    return new UserChatEntity({
      id: record.id,
      props: {
        userOneId: record.userOne,
        userTwoId: record.userTwo,
      },
    });
  }

  toResponse(entity: UserChatEntity) {
    throw new Error('Method not implemented.');
  }
}

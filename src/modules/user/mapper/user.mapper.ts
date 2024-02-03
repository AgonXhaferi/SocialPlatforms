import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';

@Injectable()
export class UserMapper implements Mapper<UserEntity, UserPersistenceEntity> {
  toPersistence(entity: UserEntity): UserPersistenceEntity {
    const copy = entity.getProps();

    return new UserPersistenceEntity(
      copy.email,
      copy.address.country,
      copy.address.postalCode,
    );
  }

  toDomain(record: any): UserEntity {
    throw new Error('Method not implemented.');
  }

  toResponse(entity: UserEntity) {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { FullName } from '@modules/user/domain/value-objects/full-name.value-object';
import { UserRoles } from '@modules/user/domain/props/user.types';

@Injectable()
export class UserMapper implements Mapper<UserEntity, UserPersistenceEntity> {
  toPersistence(entity: UserEntity): UserPersistenceEntity {
    const copy = entity.getProps();

    return new UserPersistenceEntity(
      copy.id,
      copy.fullName.firstName,
      copy.fullName.lastName,
      copy.userName,
      copy.email,
      copy.address.country,
      copy.address.postalCode,
      copy.address.street,
      copy.age,
      UserRoles.moderator,
      copy.culture,
    );
  }

  toDomain(record: UserPersistenceEntity): UserEntity {
    return new UserEntity({
      id: record.id,
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        id: record.id,
        role: record.userRole,
        address: new Address({
          country: record.country,
          street: record.street,
          postalCode: record.postalCode,
        }),
        fullName: new FullName({
          firstName: record.name,
          lastName: record.lastName,
        }),
        userName: record.userName,
        age: record.age,
        email: record.email,
        culture: record.culture,
      },
    });
  }

  toResponse(entity: UserEntity) {
    throw new Error('Method not implemented.');
  }
}

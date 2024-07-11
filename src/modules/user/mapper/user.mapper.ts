import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { FullName } from '@modules/user/domain/value-objects/full-name.value-object';
import { UserRoles } from '@modules/user/domain/props/user.props';
import { UserResponseDto } from '@modules/user/interface/adapters/response/user.response.dto';

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
      },
    });
  }

  toResponse(entity: UserEntity): UserResponseDto {
    return new UserResponseDto(
      entity.id,
      entity.getProps().fullName.firstName,
      entity.getProps().fullName.lastName,
      entity.getProps().userName,
      entity.getProps().email,
      entity.getProps().address.country,
      entity.getProps().address.postalCode,
      entity.getProps().address.street,
      entity.getProps().age,
    );
  }
}

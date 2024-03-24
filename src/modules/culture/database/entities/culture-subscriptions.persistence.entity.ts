import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { sha256Hash } from '@modules/shared/functions/sha256-map.function';

@Entity({
  name: 'culture_subscriptions',
  schema: 'culture',
})
export class CultureSubscriptionsPersistenceEntity {
  @PrimaryColumn('uuid', {
    name: 'user_id',
  })
  userId: string;

  @PrimaryColumn('varchar', {
    name: 'culture_id',
  })
  cultureId: string;

  @Column('boolean', {
    name: 'is_primary',
  })
  isPrimary: boolean;

  @ManyToOne(
    () => UserPersistenceEntity,
    (user) => user.cultureSubscriptionsPersistenceEntities,
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  userPersistenceEntity: UserPersistenceEntity;

  @ManyToOne(
    () => CulturePersistenceEntity,
    (culture) => culture.cultureSubscriptionsPersistenceEntities,
  )
  @JoinColumn({
    name: 'culture_id',
    referencedColumnName: 'name',
  })
  culturePersistenceEntity: CulturePersistenceEntity;

  constructor(userId: string, cultureId: string, isPrimary: boolean) {
    this.userId = userId;
    this.cultureId = cultureId;
    this.isPrimary = isPrimary;
  }

  getId() {
    return sha256Hash({ userId: this.userId, cultureId: this.cultureId });
  }
}

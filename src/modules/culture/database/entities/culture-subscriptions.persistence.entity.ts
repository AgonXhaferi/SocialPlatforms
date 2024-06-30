import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';

@Entity({
  name: 'culture_subscriptions',
  schema: 'culture',
})
// @Unique(['userId', 'culture_id'])
export class CultureSubscriptionsPersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column('uuid', {
    name: 'user_id',
    unique: true,
  })
  userId: string;

  @Column('varchar', {
    name: 'culture_id',
    unique: true,
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
}

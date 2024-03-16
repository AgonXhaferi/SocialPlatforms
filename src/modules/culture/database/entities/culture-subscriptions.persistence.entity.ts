import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';

@Entity({
  name: 'culture_subscriptions',
  schema: 'culture',
})
export class CultureSubscriptionsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @ManyToOne(() => UserPersistenceEntity, (user) => user.subscriptions)
  userPersistenceEntity: UserPersistenceEntity;
}

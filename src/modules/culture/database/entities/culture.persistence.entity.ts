import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CultureSubscriptionsPersistenceEntity } from '@modules/culture/database/entities/culture-subscriptions.persistence.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';

@Entity({
  name: 'culture',
  schema: 'culture',
})
export class CulturePersistenceEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  language: string;

  @Column()
  location: string;

  @CreateDateColumn({
    name: 'time_created',
  })
  timeCreated: Date;

  @UpdateDateColumn({
    name: 'time_updated',
  })
  timeUpdated: Date;

  @OneToMany(
    () => CultureSubscriptionsPersistenceEntity,
    (cultureSubscriptionEntity) =>
      cultureSubscriptionEntity.culturePersistenceEntity,
  )
  cultureSubscriptionsPersistenceEntities: CultureSubscriptionsPersistenceEntity[];

  constructor(name: string, language: string, location: string) {
    this.name = name;
    this.language = language;
    this.location = location;
  }
}

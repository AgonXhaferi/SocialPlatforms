import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'culture',
  schema: 'culture',
})
export class CulturePersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
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

  constructor(name: string, language: string, location: string) {
    this.name = name;
    this.language = language;
    this.location = location;
  }
}

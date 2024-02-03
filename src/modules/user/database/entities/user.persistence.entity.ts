import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', {
  schema: 'user',
})
export class UserPersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column({
    name: 'postal_code',
  })
  postalCode: string;

  @CreateDateColumn({
    name: 'time_created',
  })
  timeCreated: Date;

  @UpdateDateColumn({
    name: 'time_updated',
  })
  timeUpdated: Date;

  constructor(email: string, country: string, postalCode: string) {
    this.email = email;
    this.country = country;
    this.postalCode = postalCode;
  }
}

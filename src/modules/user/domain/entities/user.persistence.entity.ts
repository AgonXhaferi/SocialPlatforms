import { Column, Entity } from 'typeorm';
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

  @Column()
  postalCode: string;
}

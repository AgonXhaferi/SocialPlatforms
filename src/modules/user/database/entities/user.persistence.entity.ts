import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '@modules/user/domain/props/user.types';

@Entity('user', {
  schema: 'user',
})
export class UserPersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'user_role',
  })
  userRole: UserRoles;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    name: 'user_name',
  })
  userName: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  street: string;

  @Column()
  age: number;

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

  constructor(
    name: string,
    lastName: string,
    userName: string,
    email: string,
    country: string,
    postalCode: string,
    street: string,
    age: number,
    userRoles: UserRoles,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.country = country;
    this.postalCode = postalCode;
    this.street = street;
    this.age = age;
    this.userRole = userRoles;
  }
}

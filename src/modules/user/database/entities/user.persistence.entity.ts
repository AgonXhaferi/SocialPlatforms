import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '@modules/user/domain/props/user.types';

@Entity('user', {
  schema: 'user',
})
export class UserPersistenceEntity {
  @PrimaryColumn('uuid', {
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
    id: string,
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
    this.id = id;
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

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GpsLocation } from '@modules/shared/entities/gps-location.persistence.entity';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';

@Entity({
  name: 'culture_events',
  schema: 'culture',
})
export class CultureEventsPersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column(() => GpsLocation, {
    prefix: false,
  })
  location: GpsLocation;

  @Column('varchar', {
    name: 'culture_id',
  })
  cultureName: string;

  @Column({
    name: 'start_date',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
  })
  endDate: Date;

  @UpdateDateColumn({
    name: 'time_updated',
  })
  timeUpdated: Date;

  constructor(
    name: string,
    description: string,
    location: GpsLocation,
    culture: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.cultureName = culture;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GpsLocation } from '@modules/shared/entities/gps-location.persistence.entity';

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
    startDate: Date,
    endDate: Date,
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

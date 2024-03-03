import { Column } from 'typeorm';

export class GpsLocation {
  @Column({
    type: 'decimal',
    name: 'latitude',
  })
  latitude: number;

  @Column({
    type: 'decimal',
    name: 'longitude',
  })
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

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
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'culture_articles',
  schema: 'culture',
})
export class CultureArticlesPersistenceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'content',
  })
  content: string;

  @CreateDateColumn({
    name: 'time_created',
  })
  timeCreated: Date;

  @UpdateDateColumn({
    name: 'time_updated',
  })
  timeUpdated: Date;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @Unique(['title'])
  title: string;

  @Column('varchar')
  synopsis: string;

  @Column('int')
  year: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'datetime' })
  eventTime: Date;

  @Column({ nullable: true })
  recipeId: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}


// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('events')
// export class Event {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   userId: string;

//   @Column()
//   title: string;

//   @Column({ type: 'datetime' })
//   eventTime: Date;

//   @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({
//     type: 'datetime',
//     default: () => 'CURRENT_TIMESTAMP',
//     onUpdate: 'CURRENT_TIMESTAMP',
//   })
//   updatedAt: Date;
// }

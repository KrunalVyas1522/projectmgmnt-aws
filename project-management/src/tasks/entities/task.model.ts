import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({
  name: 'tasks',
  schema: 'public'
})
export class TasksModel extends BaseEntity{
  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar'
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar'
  })
  description: string;

  @Column({
    name: 'status',
    type: 'varchar'
  })
  status: string;

//   @Column()
//   projectId: number;

  constructor(
    title: string,
    description: string,
    status: string
  ){
    super();
    this.title = title;
    this.description = description;
    this.status = status;
  }

}

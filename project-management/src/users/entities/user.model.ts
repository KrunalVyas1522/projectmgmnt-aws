export class User {}
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({
    name: 'users',
    schema: 'public'
  })
export class UserModel extends BaseEntity{
  @PrimaryGeneratedColumn('increment', {
        name: 'id'
      })
      id: number;
    
  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar'
  })
  email: string;

  @Column({
    name: 'status',
    type: 'varchar'
  })
  status: string;

  constructor(
    name: string,
    email: string,
    status: string
  ){
    super();
    this.name = name;
    this.email = email;
    this.status = status;
  }

}

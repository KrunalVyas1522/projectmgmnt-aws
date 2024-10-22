import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'projects',
    schema: 'public'
})
export class ProjectsModel extends BaseEntity {
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
        name: 'content',
        type: 'varchar'
    })
    content: string;

    @Column({
        name: 'date',
        type: 'date'
    })
    date: Date;

    @Column({
        name: 'updated_at',
        type: 'date',
        nullable: true
    })
    updatedAt: Date;

    
    constructor(
        title: string,
        content: string,
        date: Date,
        updatedAt: Date,
    ) {
        super();
        this.title = title;
        this.content = content;
        this.date = date;
        this.updatedAt = updatedAt;
    }
}

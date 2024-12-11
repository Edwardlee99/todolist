import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
    PENDING = "pending",
    COMPLETED = "completed",
}

@Entity({name:"task", synchronize: false})
export class Todolist {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    description? : string;
  
    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
    })
    status : Status;

    @Column({ type: "datetime", nullable: false })
    created_at: Date;

    @Column({ type: "datetime", nullable: false })
    updated_at: Date;

}



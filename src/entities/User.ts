import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "text",
        nullable: false
    })
    password: string;

    // Armazena a data de criação
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    // Armazena a data da última modificação
    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;   

}
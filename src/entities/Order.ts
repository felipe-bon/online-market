import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderStatus } from "../enums/OrderStatus";

@Entity('orders')
export class Order{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'decimal', 
        precision: 10, 
        scale: 2, 
        nullable: false })
    total: number;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.Pending,
    })
    status: OrderStatus

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User
    
}
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('cart')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.cart)
    @JoinColumn()
    user: User;
}
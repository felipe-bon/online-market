import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity('carts')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(()=>CartItem, (cartItem) => cartItem.cart)
    cartItens: CartItem[]

    @OneToOne(()=>User)
    @JoinColumn()
    user:User
    static cartItens: any;
}
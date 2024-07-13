import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity('cart_itens')
export class CartItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ 
        type: 'integer',
        nullable: false})
    quantity: number;

    @ManyToOne(() => Cart, (cart) => Cart.cartItens)
    cart: Cart

    @ManyToOne(() => Product, (product) => product.cartItens)
    product: Product
}
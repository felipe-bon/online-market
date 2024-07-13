import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { CartItem } from "./CartItem";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ 
        type: "varchar",
        length: 20,
        nullable: false
    })
    name: string

    @Column({ 
        type: "text"
    })   
    description: string

    @Column({ 
        type: "varchar",
        length: 13,
        unique: true,
        nullable: false
    })  
    barcode: string
    
    @Column({ 
        type: 'decimal', 
        precision: 10, 
        scale: 2, 
        default: 0, 
        nullable: false})
    price: number;

    @ManyToMany(() => Department, department => department.products)
    @JoinTable()
    departments: Department[];

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItens: CartItem[]
}
import { Request, Response } from "express";
import { cartRepository } from "../repositories/cartRepository";
import { NotFoundError, unathorizedError } from "../helpers/api-errors";
import { cartItemRepository } from "../repositories/cartItemRepository";
import { productRepository } from "../repositories/productRepository";
import { userRepository } from "../repositories/userRepository";
import { CartItem } from "../entities/CartItem";

export class CartController{

    async getUsersCart(req: Request, res: Response){

        const cart = await cartRepository.findOne({
            where:{
                user:{
                    id: req.user.id
                }
            }
            })

        if(!cart){
            throw new NotFoundError("Cart not found");
        }

        const cartItens = await cartItemRepository.find({
            relations:["product"],
            where:{
                cart:{
                    id: cart.id
                }
            }
            })

        return res.json(cartItens)
    }


    async addProductToCart(req: Request, res: Response){
        const { id, quantity } = req.body

        const user = await userRepository.findOneBy({id:req.user.id})
        console.log(user)
        if(!user){
            throw new NotFoundError("User not logged");
        }
        
        const product = await productRepository.findOneBy({id:id})
        console.log(product)

        if(!product){
            throw new NotFoundError("Product not found");
        }

        const cart = await cartRepository.findOne({
            where:{
                user:{
                    id: req.user.id
                }
            }
            })

        if(!cart){
            throw new NotFoundError("Cart not found");
        }
        console.log(cart)

        const cartItem = cartItemRepository.create()

        cartItem.cart = cart
        cartItem.product = product
        cartItem.quantity = quantity

        cartItemRepository.save(cartItem)


        res.json(cartItem)
    }

    private calculateTotal(cartItens: CartItem[]){

    }
}
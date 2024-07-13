import { Request, Response } from "express";
import { BadRequestError, unathorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { cartRepository } from "../repositories/cartRepository";

export class UserController{

    async create(req: Request, res: Response){

        const { name, email, password } = req.body
        const salt:number = 10

        if(!name || !email|| !password){
            throw new BadRequestError('Missing name, e-mail or password');
        }

        const userExist = await userRepository.findOneBy({email})

        if(userExist){
            throw new BadRequestError('E-mail already registered')
        }

        // verificar se o email está em um formato correto com redux
        if(true){

        }

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = userRepository.create({
            name,
            email,
            password: hashPassword
        })

        await userRepository.save(newUser)
        const newCart = cartRepository.create({
            user:newUser
        }) 
        await cartRepository.save(newCart)

        const {password: _, ...user} = newUser
        return res.status(201).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await userRepository.findOneBy({email})

        if(!user){
            throw new BadRequestError('Invalid e-mail or password')
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass){
            throw new BadRequestError('Invalid e-mail or password')
        }

        const token = jwt.sign({ id: user.id}, process.env.JWT_PASS ?? '', { 
            expiresIn: '8h',
        })

        const { password:_, ...userLogin } = user
        return res.status(200).json({
            user: userLogin,
            token: token
        })
    }

    async getProfile(req: Request, res: Response){
        return res.json(req.user)
    }

}
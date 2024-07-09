import { Request, Response,NextFunction } from "express";
import { unathorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: string
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if(!authorization){
        throw new unathorizedError('Your are not logged in')
    }

    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
    const user = await userRepository.findOneBy({id})

    if(!user){
        throw new unathorizedError("Unauthorized")
    }

    const {password:_, ...userAuthorized} = user

    req.user = userAuthorized

    next();
}
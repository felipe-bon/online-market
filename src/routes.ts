import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserControllers";
import { authMiddleware } from "./middlewares/authMiddleware";
const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', authMiddleware, new UserController().getProfile)


export default routes 
import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserControllers";
import { authMiddleware } from "./middlewares/authMiddleware";
import { ProductController } from "./controllers/ProductControllers";
import { DepartmentController } from "./controllers/DepartmentsController";
import { CartController } from "./controllers/CartController";
const routes = Router()

routes.get('/products/:id', new ProductController().getProduct)
routes.post('/new/products', new ProductController().create)
routes.put('/products/:id', new ProductController().updateProduct)
routes.get('/products', new ProductController().getAll)
routes.delete('/products/:id', new ProductController().deleteProduct)

routes.post('/departments', new DepartmentController().create)
routes.get('/departments', new DepartmentController().getAll)
routes.get('/departments/:id', new DepartmentController().getDepartment)
routes.get('/departments/:departmentName/products', new ProductController().getProductsByDepartment)
routes.put('/departments/:id', new DepartmentController().updateDepartment)
routes.delete('/departments/:id', new DepartmentController().deleteDepartment)

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', authMiddleware, new UserController().getProfile)
routes.get('/cart', authMiddleware, new CartController().getUsersCart)
routes.post('/products', authMiddleware, new CartController().addProductToCart)


export default routes 
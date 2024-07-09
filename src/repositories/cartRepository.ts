import { AppDatasource } from "../data-source";
import { Cart } from "../entities/Cart";

export const DepartmentRepository = AppDatasource.getRepository(Cart)
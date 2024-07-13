import { AppDatasource } from "../data-source";
import { Cart } from "../entities/Cart";

export const cartRepository = AppDatasource.getRepository(Cart)
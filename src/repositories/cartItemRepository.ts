import { AppDatasource } from "../data-source";
import { CartItem } from "../entities/CartItem";

export const cartItemRepository = AppDatasource.getRepository(CartItem)
import { AppDatasource } from "../data-source";
import { Order } from "../entities/Order";

export const orderRepository = AppDatasource.getRepository(Order)
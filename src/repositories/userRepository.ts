import { AppDatasource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDatasource.getRepository(User)
import { User } from "../model/user.model";

export class UserDto{
    id?: string;
    active?: boolean;
    username?: string;
    password?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
import { User } from "../model/user.model";

export class UserDto{
    id?: string;
    active?: boolean;
    username?: string;
    password?: string;
    email?: string;
    university_id?:string;
    createdAt?: Date;
    updatedAt?: Date;
}
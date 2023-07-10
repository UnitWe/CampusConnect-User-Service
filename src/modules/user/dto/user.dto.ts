export class UserDto{
    id?: string;
    active?: boolean;
    name?: string;
    biograph?: string;
    graduation_course?: string;
    academic_level?: string;
    year_conclusion?: number;
    link?: string;
    username?: string;
    password?: string;
    email?: string;
    university_id?:string;
    createdAt?: Date;
    updatedAt?: Date;
}
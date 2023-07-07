import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { checkPassword } from "../../../utils/common"
import { User } from "../../user/model/user.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ){}

    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.userService.findOneByEmail(email);
        
        if(user && checkPassword(pass, user.password)){
            const { password, ...result } = user
            return result;
        }

        return null
    }

    async login(user: User){
        const { id, username, email} = user.dataValues; 
        
        const payload = {
            id,
            username,
            email
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
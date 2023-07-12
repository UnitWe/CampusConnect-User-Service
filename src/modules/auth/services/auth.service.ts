import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { checkPassword } from "../../../utils/common"
import { User } from "../../user/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { S3Service } from "../../../core/aws/s3/services/s3.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly s3Service: S3Service
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

        const profilePicUrl = await this.s3Service.getProfilePicUrl(id);

        return {
            profile_pic_url: profilePicUrl,
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
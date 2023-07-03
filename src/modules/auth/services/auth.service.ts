import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload } from "src/core/jwt/interfaces/user-jwt-payload.interface";
import { UserService } from "src/modules/user/services/user.service";
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) { }

    async signIn(authCredentialsDto: UserJwtPayload): Promise<{ token: string }> {
        
        const token: string = this.jwtService.sign(authCredentialsDto);
        return { token };
    }
}

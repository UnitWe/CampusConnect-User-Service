import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload } from "src/core/jwt/interfaces/user-jwt-payload.interface";
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async signin(authCredentialsDto: UserJwtPayload): Promise<{ token: string }> {
        const token: string = this.jwtService.sign(authCredentialsDto);
        return { token };
    }
}

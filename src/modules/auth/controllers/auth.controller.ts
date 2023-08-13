import {
    Body,
    Controller,
    Next,
    Post,
    Req,
    Res,
  } from '@nestjs/common';
import { AuthService } from "../services/auth.service";
import { NextFunction, Response, Request } from 'express';
import { Public } from '../../../decorators/auth.decorator';
import { LoginDto } from '../dto/login.dto';

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Public()
    @Post("login")
    async login(@Body() loginBody: LoginDto){
        return await this.authService.login(loginBody);
    }

}
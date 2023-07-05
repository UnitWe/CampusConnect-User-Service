import { Controller, Get, Logger, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    logger: Logger
    
    constructor(private readonly userService: UserService){
        this.logger = new Logger;
    }

    @Get()
    async show(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction){
        try {
            
        } catch (error) {
            
        }
    }

    @Post()
    async create (@Req() req: Request, @Res() res: Response, @Next() next: NextFunction){

    }

}

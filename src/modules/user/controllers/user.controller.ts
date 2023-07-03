import { Controller, Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
    logger: Logger
    
    constructor(){
        this.logger = new Logger;
    }
}

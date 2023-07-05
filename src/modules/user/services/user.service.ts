import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    logger: Logger
    constructor(){
        this.logger = new Logger;
    }
    
    findAll() {
        throw new Error('Method not implemented.');
    }
}

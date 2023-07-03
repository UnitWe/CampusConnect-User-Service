import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    logger: Logger
    constructor(){
        this.logger = new Logger;
    }
}

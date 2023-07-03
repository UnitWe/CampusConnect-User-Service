import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PublicationService {
    logger: Logger
    constructor(){
        this.logger = new Logger;
    }
}

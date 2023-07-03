import { Controller, Logger } from '@nestjs/common';

@Controller('publication')
export class PublicationController {
    logger: Logger
    constructor(){
        this.logger = new Logger;
    }
}

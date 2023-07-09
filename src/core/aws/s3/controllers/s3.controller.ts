import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { S3Service } from "../services/s3.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { UserService } from "../../../../modules/user/services/user.service";
import { Public } from "../../../../modules/auth/decorators/auth.decorator";

@Controller('profile')
export class S3Controller{
    constructor(
        private readonly s3Service: S3Service,
        private readonly userService: UserService,    
    ){}

    @Post(':id/upload')
    @Public()
    @UseInterceptors(FileInterceptor('image'))
    async uploadProfilePicture(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request,
        @Res() res: Response
    ){
        try {            
            const userData = await this.userService.findOneById(req.params.id);

            if(!userData){
                return res.status(404).send({
                    statusCode: 404,
                    message: `Failed to upload image file: User not found!`
                })
            }
            
            const result = await this.s3Service.uploadProfilePic(file.buffer, userData.username);

            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send({
                statusCode: 500,
                message: `Failed to upload image file: ${error.message}`
            })
        }
    }
}
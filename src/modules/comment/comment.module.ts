import { Module } from "@nestjs/common";
import { PublicationModule } from "../publication/publication.module";
import { UserModule } from "../user/user.module";
import { CommentController } from "./controllers/comment.controller";
import { CommentService } from "./services/comment.service";
import { commentProvider } from "./providers/comment.provider";

@Module({
    imports: [PublicationModule, UserModule],
    controllers: [ CommentController ],
    providers: [
        CommentService,
        ...commentProvider
    ]
})
export class CommentModule {}
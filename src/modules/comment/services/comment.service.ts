import { Inject, Injectable, Logger } from "@nestjs/common";
import { COMMENT_REPOSITORY } from "../constants";
import { Comment } from "../model/comment.model";
import { CommentDto } from "../dto/comment.dto";

@Injectable()
export class CommentService{
    logger: Logger;
    constructor(@Inject(COMMENT_REPOSITORY)private commentModel: typeof Comment){
        this.logger = new Logger()
    }

    async findAllByPublicationId(publication_id: string): Promise<Comment[]>{
        return await this.commentModel.findAll<Comment>({where: { publication_id }})
    }

    async create(comment: CommentDto): Promise<Comment>{
        return await this.commentModel.create<Comment>(comment);
    }
}
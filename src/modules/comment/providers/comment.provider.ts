import { COMMENT_REPOSITORY } from "../constants";
import { Comment } from "../model/comment.model";

export const commentProvider = [{
    provide: COMMENT_REPOSITORY,
    useValue: Comment
}]
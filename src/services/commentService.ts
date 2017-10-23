import { Comment } from "../dtos/comment"
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class CommentService {

    inserComment(http: Http, comment: Comment,userId:number) {
        this.insertCommentquery(http, comment);
        this.insertRating(http,comment.id,userId);
    }

    updateComment(http: Http, comment: Comment) {
        this.updateCommentQuery(http, comment);
    }

    insertCommentquery(http: Http, comment: Comment): Promise<Array<Object>> {
        let query = "INSERT INTO t_comment('CONTENT', 'FK_USER_ID', 'T_TOPIC_TOPIC_ID') VALUES (" + comment.commentary + "," + comment.userId + "," + comment.topicId + ")";
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    insertRating(http: Http, commentId: number, userId: number) {
        let query = "INSERT INTO t_rating_comment('FK_USER_ID', 'FK_COMMENT_ID', 'RATING') VALUES ("+userId+","+commentId+",0)";
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    updateCommentQuery(http: Http, comment: Comment): Promise<Array<Object>> {
        let query = "UPDATE t_rating_comment SET RATING=" + comment.rate + " WHERE FK_COMMENT_ID=" + comment.id;
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }
}
import { Comment } from "../dtos/comment"
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class CommentService {

    async inserComment(http: Http, comment: Comment, userId: number) {
        let result=this.insertCommentquery(http, comment,userId);
        console.log("after insert comment");
        return;

    }

    async insertRating(http: Http, userId: number) {
        let id = await this.selectLastId(http);
        console.log(id);
        console.log( id[0]["id"]);
        console.log("insert Rating");
        this.insertRatingQuery(http, id[0]["id"], userId);
    }

    updateComment(http: Http, comment: Comment) {
        this.updateCommentQuery(http, comment);
    }

    insertCommentquery(http: Http, comment: Comment,userId): Promise<Array<Object>> {
        console.log(comment);
        let query = "INSERT INTO t_comment (`CONTENT`, `FK_USER_ID`, `T_TOPIC_TOPIC_ID`) VALUES ('" + comment.commentary + "'," + userId + "," + comment.topicId + ")";
        console.log(query);
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    insertRatingQuery(http: Http, commentId: number, userId: number): Promise<Array<Object>> {
        let query = "INSERT INTO t_rating_comment (`FK_USER_ID`, `FK_COMMENT_ID`, `RATING`) VALUES (" + userId + "," + commentId + ",0)";
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    updateCommentQuery(http: Http, comment: Comment): Promise<Array<Object>> {
        let query = "UPDATE t_rating_comment SET RATING=" + comment.rate + " WHERE FK_COMMENT_ID=" + comment.id;
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    selectLastId(http: Http): Promise<number> {
        let query = "SELECT max(COMMENT_ID)as id from t_comment";
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }
}
import { Topic } from "../dtos/topic"
import { Comment } from "../dtos/comment"
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class topicService {


    async retrieveTopicById(id: number,http:Http) {
        //retrieve topic with DAO 
        //first retrieve topic
        let result = await this.daoRequestRetrieveTopic(http,id);
        let topic = new Topic(result[0]["TOPIC_ID"], result[0]["SUMMARY"], result[0]["TITLE"]);
        topic.like=result[0]["RATING"];

        
        //retrieve comment
        let resultComment = await this.daoRequestRetrieveComment(http,id);
        var listComments: Array<Comment>;
        resultComment.forEach(element => {
            let  comment = new Comment();
            comment.id=element["COMMENT_ID"];
            comment.commentary=element["CONTENT"];
            comment.topicId=topic.id;
            comment.userId=element["FK_USER_ID"];
            comment.rate= element["RATING"];
            listComments.push(comment);
        });
        topic.listComment=listComments;
        
        return topic;

    }

    persiteTopic(topic: Topic,http:Http) {
        this.insertTopic(http,topic);
    }

    updateTopic(http:Http,nbLike:number,id:number){
        this.updateTopicQuery(http,nbLike,id);
    }

    daoRequestRetrieveTopic(http:Http,id:number) : Promise<Array<Object>>{
        let query = "select topic.*,rate.RATING from t_topic topic join t_rating_topic rate on rate.T_TOPIC_TOPIC_ID=topic.TOPIC_ID where topic.TOPIC_ID="+id;
        return http.get("http://localhost:3000/?query="+query).toPromise().then(response=> response.json());
    }

    daoRequestRetrieveComment(http:Http,id:number) : Promise<Array<Object>>{
        let query = "select comm.*,rate.RATING from t_comment comm join t_rating_comment rate on rate.FK_COMMENT_ID=comm.COMMENT_ID where comm.T_TOPIC_TOPIC_ID="+id;
        return http.get("http://localhost:3000/?query="+query).toPromise().then(response=> response.json());
    }

    insertTopic(http:Http,topic:Topic) : Promise<Array<Object>>{
        let query = "INSERT INTO t_topic ('TITLE', 'SUMMARY', 'IS_FUN') VALUES (\""+topic.title+"\",\""+topic.summary+"\","+topic.is_fun+")";
        return http.get("http://localhost:3000/?query="+query).toPromise().then(response=> response.json());
    }

    updateTopicQuery(http:Http,nbLik:number,id:number) : Promise<Array<Object>>{
        let query = "UPDATE t_rating_topic SET RATING="+nbLik+" WHERE T_TOPIC_TOPIC_ID="+id;
        return http.get("http://localhost:3000/?query="+query).toPromise().then(response=> response.json());
    }
}
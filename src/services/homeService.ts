import { Topic } from "../dtos/topic"
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class HomeService {

    //DAO to determine

    async retrieveTopicByCategory(category: string, http: Http) {

        var is_fun;
        if (category === "FUN") {
            is_fun = 0
        }
        else {
            is_fun = 1;
        }
        var listTopics: Array<Topic>;
        listTopics = [];

        let test = await this.daoRequest(http, is_fun);
        test.forEach(element => {
            console.log(JSON.stringify(element));
            let topic = new Topic(element["TOPIC_ID"], element["SUMMARY"], element["TITLE"]);
            topic.like=element["RATING"];
           

            listTopics.push(topic);
            
        });

        for (var index = 0; index < listTopics.length; index++) {
            var element = listTopics[index];
            let nbComment = await this.daoRequestNbComment(http,element.id);
            element.nbComm=nbComment["nbComment"];
            
        }
        console.log(JSON.stringify(listTopics));
        
        return listTopics;

    }

    daoRequest(http: Http, is_fun: string): Promise<Array<Object>> {
        let query ="select topic.*,rate.RATING from t_topic topic join t_rating_topic rate on rate.T_TOPIC_TOPIC_ID=topic.TOPIC_ID where is_fun="+is_fun;
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }

    daoRequestNbComment(http: Http,id: number): Promise<number> {
        let query ="select count(*) as nbComment from t_comment where T_TOPIC_TOPIC_ID="+id;
        return http.get("http://localhost:3000/?query=" + query).toPromise().then(response => response.json());
    }
}
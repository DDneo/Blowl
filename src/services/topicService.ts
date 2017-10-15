import {Topic} from "../dtos/topic"

export class topicService {

    retrieveTopicById( id : number){
        //retrieve topic with DAO
        return new Topic(1,"summary","title");

    }

    persiteTopic(topic:Topic){
        //call DAO to persist Topic
    }
}
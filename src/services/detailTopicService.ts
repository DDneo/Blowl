import {Topic} from "../dtos/topic"

export class DetailTopicService {

    retrieveTopicById( id : number){
        //retrieve topic with DAO
        return new Topic(1,"summary","title");

    }
}
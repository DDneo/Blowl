import {Topic} from "../dtos/topic"
import {MockListTopic} from "../mocks/mockListTopic"

export class HomeService {

    //DAO to determine
    
        retrieveTopicByCategory(category : string) {
            let mock = new MockListTopic();

            var listTopics: Array<Topic>;
            listTopics=[];
            //call dao to retrieve data with category
            return listTopics;

        }
}
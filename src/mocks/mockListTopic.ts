import {Topic} from "../dtos/topic"

export class MockListTopic {
    listTopics: Array<Topic>;

    mockListTopic() {
        
        this.listTopics = [];
        for (let i = 1; i < 11; i++) {
            let topic = new Topic(i,"Summary "+i,"title "+i);
            this.listTopics.push(topic);
        }
        return this.listTopics;
    }
}
import {Topic} from "../dtos/topic"
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class HomeService {

    //DAO to determine
    
        async retrieveTopicByCategory(category : string,http:Http) {


           /*  var response = http.get("http://localhost:3000")
            .map(res=>res.json())
            .subscribe(data => 
              console.log("hereeeee"+JSON.stringify(data)),
              err => console.log(JSON.stringify(err))
            ); */
            var is_fun;
            if (category==="FUN"){
                is_fun=0
            }
            else {
                is_fun=1;
            }
            var listTopics: Array<Topic>;
            listTopics=[];

            let test=await this.daoRequest(http,is_fun);
            test.forEach(element => {
                console.log(element["TITLE"]);
                let topic = new Topic(element["TOPIC_ID"],element["SUMMARY"],element["TITLE"]);
                listTopics.push(topic);

            });
           //console.log(test);
            //console.log(test[0]["TITLE"]);
           //console.log("result "+JSON.stringify(test))
           //test = JSON.parse((JSON.stringify(test).replace("[","").replace("]","")));
           //console.log(test["TITLE"]);

           

           
            //call dao to retrieve data with category
            
            return listTopics;

        }

        daoRequest(http:Http,is_fun:string) : Promise<Array<Object>>{
            return http.get("http://localhost:3000/?query=select * from t_topic where is_fun="+is_fun).toPromise().then(response=> response.json());
        }
}
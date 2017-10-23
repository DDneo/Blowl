import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { ProfilPage } from '../profil/profil';
import { Http } from '@angular/http';
import { HomeService } from '../../services/homeService';
import { topicService } from '../../services/topicService';
import { Topic } from '../../dtos/topic';
import { Comment } from '../../dtos/comment';
import { CommentService } from '../../services/commentService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  topicList: Array<Topic>;
  topicListToPresent: Array<Object>;
  http: Http;

  //public dataApp: any[];
  constructor(public navCtrl: NavController, http: Http) {
    this.http = http;
    this.topicListToPresent = [];
    this.retrieveData("FUN", http).then(data => data.forEach(element => {
      //console.log(element);
      this.topicListToPresent.push(element);
    }));

    //this.inserttruc(http);
    //this.insertComment(http);

  }
  async retrieveData(category: string, http: Http) {
    let homeservice = new HomeService();
    let result = await homeservice.retrieveTopicByCategory(category, http);
    console.log(result);
    return result;
  }

  async insertComment(http: Http) {
    let commentService = new CommentService();
    let com = new Comment();
    com.commentary = "toto";
    com.topicId = 1;
    await commentService.inserComment(http, com, 1);
    await commentService.insertRating(http, 1);
  }

  async inserttruc(http: Http) {
    let topicServ = new topicService();
    let top = new Topic(0, "new", "new");
    top.is_fun = 0;
    await topicServ.insertTopic(http, top);
    await topicServ.persistRating(http, 1);
  }

  private dataApp;
  ngOnInit() {
    this.dataApp = this.topicListToPresent
  }

  goTodetail(index) {
    console.log(index);
    this.navCtrl.push(DetailPage, {
      topic: index
    });
    console.log('reussite');
  }

  clickOnBiz() {
    this.topicListToPresent.length = 0;
    this.retrieveData("BIZ", this.http).then(data => data.forEach(element => {
      //console.log(element);
      this.topicListToPresent.push(element);
    }));
  }

  clickOnFun() {
    this.topicListToPresent.length = 0;
    this.retrieveData("FUN", this.http).then(data => data.forEach(element => {
      //console.log(element);
      this.topicListToPresent.push(element);
    }));
  }

  goToProfile() {
    this.navCtrl.push(ProfilPage);
  }

  goToSeach() {

  }

  goToCreate(){
    
  }
}

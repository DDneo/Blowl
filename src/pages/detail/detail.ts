import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Topic} from '../../dtos/topic';
import {Comment} from '../../dtos/comment';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  currentTopic:Topic;
  isenabled : boolean;
  seeCommentZone : boolean;
  disableCommentButton:boolean;
  commentary:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get("topic"));
    this.currentTopic=navParams.get("topic");
    this.isenabled=true;
    this.seeCommentZone=false;
    this.disableCommentButton=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  plusOne(){
    this.currentTopic.like++;
    this.isenabled=false;
  }
  seeComment(){
    this.currentTopic.listComment=[];
    //this.currentTopic.listComment.length=1;
    let comment = new Comment();
    comment.commentary='Peut être';
    this.currentTopic.listComment.push(comment);
  }

  showCommentZone(){
    this.seeCommentZone=true;
    this.disableCommentButton=false;
  }
  saveComment(){
    let comment = new Comment();
    comment.commentary=this.commentary;
    this.currentTopic.listComment.push(comment);
    console.log(this.commentary);
  }
}

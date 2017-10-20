import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import {Http} from '@angular/http';
import {HomeService} from '../../services/homeService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //public dataApp: any[];
  constructor(public navCtrl: NavController,http:Http) {
    let truc = this.retrieveData("FUN",http);
    
  }
  async retrieveData(category:string,http:Http){
    let homeservice = new HomeService();
    let result= await homeservice.retrieveTopicByCategory(category,http);
    return result;
  }

  private dataApp;
  ngOnInit() {
    this.dataApp = [{
      title : 'Mon titre 1',
      date : '05/12/2015',
      descriptif : 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.'
    },
    {
      title : 'Mon titre 2',
      date : '05/12/2010',
      descriptif : ' Uhhh... Are you telling me that you built a time machine...  Wait a minute. Wait a minute, Doc.out of a DeLorean?! Whoa. This is heavy.'
    },
    {
      title: 'Mon titre 3',
      date: '22/05/2012',
      descriptif: 'BlaBlaBla'
    },
    {
      title: 'Mon titre 3',
      date: '22/05/2012',
      descriptif: 'BlaBlaBla'
    },
    {
      title: 'Mon titre 3',
      date: '22/05/2012',
      descriptif: 'BlaBlaBla'
    },
    {
      title: 'Mon titre 3',
      date: '22/05/2012',
      descriptif: 'BlaBlaBla'
    }
  ]
  }

  goTodetail(index){
    console.log(index);
    this.navCtrl.push(DetailPage);
    console.log('reussite');
  }
  

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /* loginAction() {
      
      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: "Log in with your email address",
        inputs: [
          {
            name: 'Email',
            placeholder: 'jacquechirac@hotmail.com'
          },
          {
            name: 'Password',
            placeholder: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.navCtrl.push(HomePage);
            }
          }
        ]
      });
      prompt.present();
    } */
    loginAction() {
      this.navCtrl.push(HomePage);
    }
    
  

}

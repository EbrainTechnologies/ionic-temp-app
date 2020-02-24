import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { User } from '../../../node_modules/firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProfilePage} from '../profile/profile';
import {ShareService} from '../../service/share.service'
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user={} as User
  userId={
    uid:''
  }
  loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav, 
              private afauth:AngularFireAuth,
              private alertCtrl:AlertController,
              private shareService:ShareService,
              public loadingCtrl: LoadingController) {
                this.loader = this.loadingCtrl.create({
                  content: `Please Wait...`,
              }); 
  }

  alert(message){
    this.alertCtrl.create({
      title:'Info',
      subTitle:message,
      buttons:['OK']
    }).present()
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
register(user){
  this.loader.present();
  this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password)
  .then(data=>{
    this.userId.uid=this.afauth.auth.currentUser.uid;
    this.shareService.setUser(this.userId);
    this.alert('Registered !')
    this.nav.setRoot(ProfilePage);
    this.loader.dimiss();
  })
  .catch(error=>{
    this.alert(error.message);
  });
}
login(){
  this.nav.setRoot(LoginPage);
}

}

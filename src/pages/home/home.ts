import { Component, ViewChild } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import {LandingpagePage} from '../landingpage/landingpage';
import {ProfilePage}from '../profile/profile'
import {EditProfilePage} from '../edit-profile/edit-profile'
import {LoginPage} from '../login/login';
import {AngularFireAuth} from 'angularfire2/auth'
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email:String;
  public rootPage:any
  @ViewChild(Nav) nav: Nav;
  loader:any;
  constructor(public navCtrl: NavController,
              private afauth:AngularFireAuth,
              private alrtCtrl:AlertController,
              public loadingCtrl: LoadingController) {
                this.loader = this.loadingCtrl.create({
                  content: `Please Wait...`,
              }); 
              this.email=afauth.auth.currentUser.email
              }

    alert(message){
     this.alrtCtrl.create({
       title:'Info',
       subTitle:message,
       buttons:['OK']
     }).present()
  }

  openPage(page){
  switch(page){
  case 'dashboard':
  this.nav.setRoot(LandingpagePage);
  break;

  case 'profile':
  this.nav.setRoot(EditProfilePage);
  break;
  // case 'logout':
  // this.nav.setRoot(LoginPage)
  default:
  this.nav.setRoot(LandingpagePage);
  break;
}
}
logout(){
   this.afauth.auth.signOut();
   this.loader.present();
   setTimeout(()=>{
     this.loader.dismiss();
     this.nav.setRoot(LoginPage);
     this.alert("Signedout"+"<br>"+this.email)
   })
}
  ionViewDidLoad(){
    this.rootPage = LandingpagePage;
   }
}

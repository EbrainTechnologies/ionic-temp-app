import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,AlertController } from 'ionic-angular';
import {ShareService} from '../../service/share.service'
import {DataService} from '../../service/data.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {LandingpagePage} from '../landingpage/landingpage'
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  currentUser:any;
  email={
    value:''
  }
  loader:any
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private afauth:AngularFireAuth,
              private shareService:ShareService,
              private dataService:DataService,
              private alertCtrl:AlertController,
              public loadingCtrl: LoadingController
              ) {
              this.currentUser=this.shareService.getCurrentProfile();
              this.email.value=this.afauth.auth.currentUser.email
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

  ionViewDidLoad() { }
  goHome(){
    this.nav.setRoot(LandingpagePage);
    }
  updateProfile(){
    this.loader.present();
    this.dataService.updateProfile(this.currentUser).subscribe(res=>{
      this.alert('Your profile Successfully'+"<br>"+"Updated");

    })
    this.loader.dismiss();
  }

}

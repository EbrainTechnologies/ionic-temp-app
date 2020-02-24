import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import {DataService} from '../../service/data.service';
import {ShareService} from '../../service/share.service'
import { LandingpagePage } from '../landingpage/landingpage';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  ProfileDetails:any;
  currentUser:any;
  profile={};
  userId:any;
  loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataservice:DataService,
              public nav:Nav,
              private shareService:ShareService,
              public loadingCtrl: LoadingController) {
              this.userId=this.shareService.getUser()
              this.currentUser=this.shareService.getCurrentProfile()
              this.loader = this.loadingCtrl.create({
                content: `Please Wait...`,
            });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

  creatProfile(){
    this.loader.present();
    this.ProfileDetails=Object.assign({},this.userId,this.profile)
    this.dataservice.createProfile(this.ProfileDetails).subscribe(res=>{
      this.nav.setRoot(HomePage);
      this.loader.dimiss()
    })
    
  }


}

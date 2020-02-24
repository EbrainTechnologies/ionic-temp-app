import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Nav} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {DataService} from '../../service/data.service'
import {ShareService} from '../../service/share.service';
import { Complient } from '../../module/complient';
import {LandingpagePage} from '../landingpage/landingpage';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ComplaintsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complaints',
  templateUrl: 'complaints.html',
})
export class ComplaintsPage {
  today = new Date().toLocaleDateString()
  currentProfile:any;
  complient={} as Complient
  complientWithProfile:any;
  DateAndTime={
    createdDateTime:this.today
  }
  userId={
    uid:''
  }
  Notification:any;
  loader:any;
  complietNotifications:any=[];
  completedDetail:any;
completedMessages={
  customerMessage:"Completed",
  completedDateTime:this.today
}
completedNotifications:any=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private afauth:AngularFireAuth,
              private dataservice:DataService, 
              private alertCtrl:AlertController,
              private shareService:ShareService,
              public loadingCtrl: LoadingController)
               {
                this.loader = this.loadingCtrl.create({
                  content: `Please Wait...`,
              });   
              this.currentProfile=this.shareService.getCurrentProfile(); 
              this.userId.uid=afauth.auth.currentUser.uid;
              this.Notification = "addnew";
 
              }
  
  // Alert

  alert(message) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present()
  }

  ionViewDidLoad() {
    this.findNotifications()
  }
  goHome(){
  this.nav.setRoot(LandingpagePage);
  }
  findNotifications() {
    this.dataservice.findAllNotifications(this.userId).subscribe(res => {
      for(let i=0;i<res.length;i++){
        if(res[i].department==="complaint"){
          this.complietNotifications.push(res[i])
          console.log(this.complietNotifications);
        }
      }
      this.findCompletedNotifications();
    })
  }

  createComplient() {
    this.loader.present();
    console.log(this.complientWithProfile);
    this.complientWithProfile = Object.assign({}, this.currentProfile, this.complient, this.DateAndTime);
    this.dataservice.createNewComplient(this.complientWithProfile).subscribe(res => {
      console.log(res);
      this.alert('Complient Created');
       this.nav.setRoot(ComplaintsPage);
       this.loader.dismiss();
    }); 
  }

  completed(value){
    console.log(value);
    this.loader.present();
    this.completedDetail=Object.assign({},this.completedMessages,value);
    this.dataservice.completedAccepted(this.completedDetail).subscribe(res=>{
    this.alert('You have accepted')
    })
    this.findCompletedNotifications();
    this.loader.dismiss();
  }

  findCompletedNotifications(){
    this.dataservice.findCompletedNotifications(this.userId).subscribe(res=>{
      for(let i=0;i<res.length;i++){
        if(res[i].department==="complaint"){
          this.completedNotifications.push(res[i])
          console.log(this.completedNotifications);
        }
      }
    })
   }


}

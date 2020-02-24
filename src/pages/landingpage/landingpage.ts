import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController  } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import {MaintenancePage} from '../maintenance/maintenance' 
import {RiseRequestPage} from '../rise-request/rise-request'
import {NewsPage} from '../news/news';
import {ComplaintsPage} from '../complaints/complaints';
import {AngularFireAuth} from 'angularfire2/auth';
import {DataService} from '../../service/data.service'
import {ShareService} from '../../service/share.service';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Observable} from 'rxjs';



/**
 * Generated class for the LandingpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landingpage',
  templateUrl: 'landingpage.html',
})
export class LandingpagePage {
  hideMe:any;
  errorMessage:"No new Notification";
  allNotification:any;
  complientNotify:any=[]
  maintenanceNotify:any=[]
  riseReqNotify:any=[]
  unWantedDetails:any=[]
  email:String
  userId={
    uid:''
  }
 Notification:any;
 loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private afauth:AngularFireAuth,
              private toast:ToastController,
              private dataService:DataService,
              private alertCtrl:AlertController,
              private shareService:ShareService,
              public loadingCtrl: LoadingController) {

                this.loader = this.loadingCtrl.create({
                  content: `Please Wait...`,
                  dismissOnPageChange: true
              });  
              this.email=afauth.auth.currentUser.email
              this.userId.uid=afauth.auth.currentUser.uid;
              this.Notification = "Request";
  }
  currentUserDetails={
    uid:'',
    name:'',
    homecategory:'',
    block:'',
    floor:'',
    flatno:'',
    contact:''
  }

  ionViewDidLoad() {
      this.findProfile();
  }
 
  findProfile(){
    this.loader.present();
    this.dataService.findProfile(this.userId).subscribe(res=>{
      this.currentUserDetails.uid=res.uid;
      this.currentUserDetails.name=res.name;
      this.currentUserDetails.homecategory=res.homecategory;
      this.currentUserDetails.block=res.block;
      this.currentUserDetails.floor=res.floor;
      this.currentUserDetails.flatno=res.flatno;
      this.currentUserDetails.contact=res.contact;
      
      // console.log(res);
      this.shareService.setCurrentProfile(this.currentUserDetails);
      this.findNotifications();
      
    })
  }

  findNotifications(){
    this.dataService.findAllNotifications(this.userId).subscribe(res=>{
      this.shareService.setAllNotifications(res);
      console.log(res);
      this.allNotification=res;
      for(let i=0;i<this.allNotification.length;i++){
        if(this.allNotification[i].department==="request"){
          this.riseReqNotify.push(this.allNotification[i])
        }
       else if(this.allNotification[i].department==="complaint"){
          this.complientNotify.push(this.allNotification[i])
        }
        else {
          this.maintenanceNotify.push(this.allNotification[i]);
        }
      }
      this.loader.dismiss();
    })
  }

  alert(message){
    this.alertCtrl.create({
      title:'Info',
      subTitle:message,
        buttons: [
                {
                    text: 'Ok',
                }
            ]
 
    }).present()
 }
  maintenace(){
    this.nav.setRoot(MaintenancePage);
  }
  riseRequest(){
    this.nav.setRoot(RiseRequestPage);
  }
  newsUpdates(){
    this.nav.setRoot(NewsPage);
  }
  complaints(){
    this.nav.setRoot(ComplaintsPage);
  }
close(value){

let data={
  _id:value
}

  // this.alert('Do you Want clear This Notification');
  this.alertCtrl.create({
    title:'Info',
    subTitle:'Do you Want clear This Notification',
      buttons: [
              {
                  text: 'No',
                  handler: () => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Yes',
                  handler: () => {
                    this.deleteNotification(data)
                  }
              }
          ]

  }).present()
  
}
deleteNotification(data){
  this.dataService.deleteNotification(data).subscribe(res=>{
    this.alert('Notification deleted')
    this.nav.setRoot(HomePage);
    
  })
}
}

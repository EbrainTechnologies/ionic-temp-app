import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {DataService} from '../../service/data.service'
import { Maintenance } from '../../module/maintenance';
import {ShareService} from '../../service/share.service';
import {LandingpagePage} from '../landingpage/landingpage';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the MaintenancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html',
})
export class MaintenancePage {
  today = new Date().toLocaleDateString()
  newMaintenance = {} as Maintenance;
  maintenanceWithProfile:any;
  currentProfile:any;
  maintenanceNotification:any=[];
  dateAndTime={createdDateTime:this.today}
 Notification:any;
 loader:any;
 userId={
  uid:''
}
completedDetail:any;
completedNotifications:any=[];
completedMessages={
  customerMessage:"Completed",
  completedDateTime:this.today
}
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private afauth:AngularFireAuth,
              private dataservice:DataService, 
              private alertCtrl:AlertController,
              private shareService:ShareService,
              public loadingCtrl: LoadingController
              ) {
              this.userId.uid=afauth.auth.currentUser.uid;  
              this.currentProfile=this.shareService.getCurrentProfile();
              console.log(this.maintenanceNotification);
              this.Notification = "addnew";
              this.loader = this.loadingCtrl.create({
                content: `Please Wait...`,
            });
  }

  // alert

  alert(message){
    this.alertCtrl.create({
      title:'Info',
      subTitle:message,
      buttons:['OK']
    }).present()
 }

  ionViewDidLoad() {
    this.findNotifications();
  }
  goHome(){
    this.nav.setRoot(LandingpagePage);
    }


    findNotifications() {
      this.dataservice.findAllNotifications(this.userId).subscribe(res => {
        for(let i=0;i<res.length;i++){
          if(res[i].department==="maintenance"){
            this.maintenanceNotification.push(res[i])
            console.log(this.maintenanceNotification);
          }
        }
        this.findCompletedNotifications();
      })
    }

  createMaintenance() {
    this.loader.present();
    this.maintenanceWithProfile=Object.assign({},this.newMaintenance,this.currentProfile,this.dateAndTime)
    console.log(this.maintenanceWithProfile)
    this.dataservice.createMaintenance(this.maintenanceWithProfile).subscribe(res=>{
      // console.log(res);
      this.alert(res.message);
      this.loader.dismiss();
      this.nav.setRoot(MaintenancePage);
    })
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
        if(res[i].department==="maintenance"){
          this.completedNotifications.push(res[i])
          console.log(this.completedNotifications);
        }
      }
    })
   }

}

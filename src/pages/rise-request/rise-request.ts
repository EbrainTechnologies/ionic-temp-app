import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {Nav} from 'ionic-angular'
import {AngularFireAuth} from 'angularfire2/auth';
import {ShareService} from '../../service/share.service';
import { RiseRequest } from '../../module/riseRequest';
import {DataService} from '../../service/data.service';
import {LandingpagePage} from '../landingpage/landingpage';
import { LoadingController } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the RiseRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rise-request',
  templateUrl: 'rise-request.html',
})
export class RiseRequestPage {

  today = new Date().toLocaleDateString()
  riseRequest={} as RiseRequest
  currentProfile:any;
  dateAndTime={createdDateTime:this.today}
  riseReqWithProfile:any;
  Notification:any;
  loader:any;
  riseReqNotifications:any=[];
  userId={
    uid:''
  }
  completedMessages={
    customerMessage:"Completed",
    completedDateTime:this.today
  }
  completedNotifications:any=[]
  completedDetail:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private afauth:AngularFireAuth,
              private altCtrl:AlertController,
              private dataservice:DataService,
              private shareService:ShareService,
              public loadingCtrl: LoadingController) {
              this.userId.uid=afauth.auth.currentUser.uid;
              this.currentProfile=this.shareService.getCurrentProfile();
              this.Notification = "addnew";
              // Loader
              this.loader = this.loadingCtrl.create({
              content: `Please Wait...`,
               });
              
  }

  // alert
  alert(message){
    this.altCtrl.create({
      title:'Info',
      subTitle:message,
      buttons:['OK']
    }).present()
 }

  ionViewDidLoad() {
    this.findNotifications()
  }


  findNotifications() {
    this.dataservice.findAllNotifications(this.userId).subscribe(res => {
      for(let i=0;i<res.length;i++){
        if(res[i].department==="request"){
          this.riseReqNotifications.push(res[i])
          console.log(this.riseReqNotifications);
        }
      }
      this.findCompletedNotifications();
    })
  }
  findCompletedNotifications(){
   this.dataservice.findCompletedNotifications(this.userId).subscribe(res=>{
    for(let i=0;i<res.length;i++){
      if(res[i].department==="request"){
        this.completedNotifications.push(res[i])
        console.log(this.completedNotifications);
      }
    }
   })
  }
  createRequest(){
    this.loader.present();
    console.log(this.riseRequest);
    this.riseReqWithProfile=Object.assign({},this.currentProfile,this.riseRequest,this.dateAndTime);
    console.log(this.riseReqWithProfile);
    this.dataservice.createNewRiseRequest(this.riseReqWithProfile).subscribe(res=>{
      console.log(res);
      this.alert("Your Request Created");
      this.nav.setRoot(RiseRequestPage);
    })
    this.loader.dismiss();
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

  goHome(){
    this.nav.setRoot(LandingpagePage);
  }



}

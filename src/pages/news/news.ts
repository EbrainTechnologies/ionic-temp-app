import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Nav} from 'ionic-angular';
import {DataService} from '../../service/data.service';
import {LandingpagePage} from '../landingpage/landingpage';
import { LoadingController } from 'ionic-angular';





/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  allNews:any;
  Notification:any;
  loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav:Nav,
              private dataService:DataService,
              public loadingCtrl: LoadingController) {
              this.Notification="latestnews"
              this.loader = this.loadingCtrl.create({
                content: `Please Wait...`,
            });
  }

  ionViewDidLoad() {
    this.loader.present();
    console.log('ionViewDidLoad NewsPage');
    this.dataService.getAllNews().subscribe(res=>{
      this.allNews=res;
    })
    this.loader.dismiss();
  }
  goHome(){
    this.nav.setRoot(LandingpagePage);
    }


}

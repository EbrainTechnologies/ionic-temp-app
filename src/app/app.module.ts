import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ProfilePage} from '../pages/profile/profile';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {LandingpagePage} from '../pages/landingpage/landingpage';
import {MaintenancePage} from '../pages/maintenance/maintenance';
import {RiseRequestPage} from '../pages/rise-request/rise-request';
import {NewsPage} from '../pages/news/news';
import {ComplaintsPage} from '../pages/complaints/complaints';
import { AngularFireModule } from 'angularfire2';
import {AuthService} from '../service/auth.service';
import { AngularFireAuthModule } from '../../node_modules/angularfire2/auth';
import {FIREBASE_CONFIG} from './app.firebase.config'

import {DataService} from '../service/data.service';
import {ShareService} from '../service/share.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    LandingpagePage,
    MaintenancePage,
    RiseRequestPage,
    NewsPage,
    ComplaintsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    LandingpagePage,
    MaintenancePage,
    RiseRequestPage,
    NewsPage,
    ComplaintsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
  ]
})
export class AppModule {}

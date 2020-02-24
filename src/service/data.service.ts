import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class DataService {

    newMaintenace:any;
    profile:any;
    currentprofile:any;
    updatedProfile:any;
    newRiseReq:any;
    newComplient:any;
    allNews:any;
    notifications:any;
    completedNotifications:any;

    constructor(
        private http:Http,
    ) { }

    baseUrl="https://flatsafety.herokuapp.com";
    // baseUrl="http://localhost:4000";
    // baseUrl="http://49.206.118.229:4000"
    createMaintenance(value){
        return this.http.post(this.baseUrl+'/maintenace/createManitenance',value)
        .map(result=>this.newMaintenace=result.json())
    }
    createProfile(value){
        return this.http.post(this.baseUrl+'/flatUsers/createProfile',value)
        .map(result=>this.profile=result.json())
    }
    findProfile(value){
        return this.http.post(this.baseUrl+'/flatUsers/findProfile',value)
        .map(result=>this.currentprofile=result.json())
    }
    updateProfile(value){
        return this.http.post(this.baseUrl+'/flatUsers/updateProfile',value)
        .map(result => this.updatedProfile=result.json())
    }
    createNewRiseRequest(value){
        return this.http.post(this.baseUrl+'/riseReqs/createRiseReq',value)
        .map(result => this.newRiseReq=result.json())
    }
    createNewComplient(value){
        return this.http.post(this.baseUrl+'/complients/createComplient',value)
        .map(result => this.newComplient=result.json()) 
    }
    getAllNews(){
        return this.http.get(this.baseUrl+'/news/getAllNews')
        .map(result=>this.allNews=result.json());
    }
    findAllNotifications(value){
        return this.http.post(this.baseUrl+'/notification/findNotify',value)
        .map(result=>this.notifications=result.json())
    }
    deleteNotification(value){
        return this.http.post(this.baseUrl+'/notification/removeNotify',value);
    }
    completedAccepted(value){
        return this.http.post(this.baseUrl+'/completed/completedAccepted',value)
    }
    findCompletedNotifications(value){
        return this.http.post(this.baseUrl+'/completed/completedNotifications',value)
        .map(result=>this.completedNotifications=result.json())
    }
}
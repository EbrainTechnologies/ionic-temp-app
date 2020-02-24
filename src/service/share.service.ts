import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    user:any
    currentProfile:any;
    maintenanceNotifications:any;
    riseRequestNotifications:any;
    complientNotifications:any;
    allNotifications:any;
    constructor() { }
    setUser(value){
        this.user=value
        // console.log(this.user);
    }
    getUser(){
        return this.user;
    }
    setCurrentProfile(value){
        this.currentProfile=value
    }
    getCurrentProfile(){
        return this.currentProfile;
    }
    setMaintenanceNotifications(value){
        this.maintenanceNotifications=value
    }
    getMaintenanceNotifications(){
        return this.maintenanceNotifications
    }
    setRequestNotifications(value){
        this.riseRequestNotifications=value
    }
    getRequestNotifications(){
        return this.riseRequestNotifications
    }
    setComplientNotifications(value){
        this.complientNotifications=value
    }
    getComplientNotifications(){
        return this.complientNotifications
    }
    setAllNotifications(value){
        this.allNotifications=value
    }
    getAllNotifications(){
        return this.allNotifications
    }
    
}
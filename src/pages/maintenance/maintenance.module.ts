import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenancePage } from './maintenance';
@NgModule({
  declarations: [
    MaintenancePage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenancePage),
  ],
  entryComponents: [
    MaintenancePage,
  ]
})
export class MaintenancePageModule {}

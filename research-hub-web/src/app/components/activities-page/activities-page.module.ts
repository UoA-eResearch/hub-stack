import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesPageComponent } from './activities-page.component';
import { ActivitiesPageRoutingModule } from './activities-page-routing.module';
import { SharedModule } from '../shared/app.shared.module';


@NgModule({
  declarations: [
    ActivitiesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActivitiesPageRoutingModule
  ]
})
export class ActivitiesPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesPageComponent } from './activities-page.component';
import { ActivitiesPageRoutingModule } from './activities-page-routing.module';



@NgModule({
  declarations: [
    ActivitiesPageComponent
  ],
  imports: [
    CommonModule,
    ActivitiesPageRoutingModule
  ]
})
export class ActivitiesPageModule { }

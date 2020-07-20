import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubhubsRoutingModule } from './subhubs-routing.module';
import { SubhubsComponent } from './subhubs.component';


@NgModule({
  declarations: [SubhubsComponent],
  imports: [
    CommonModule,
    SubhubsRoutingModule
  ]
})
export class SubhubsModule { }

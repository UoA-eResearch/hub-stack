import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';


@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }

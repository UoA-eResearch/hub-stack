import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module.ts';
import { EventsComponent } from './events.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class EventsModule { }

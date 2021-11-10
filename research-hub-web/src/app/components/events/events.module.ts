import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { EventListComponent } from './event-list/event-list.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [EventComponent, EventListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class EventsModule { }

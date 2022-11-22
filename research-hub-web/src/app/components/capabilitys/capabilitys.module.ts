import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapabilityRoutingModule } from './capability-routing.module';
import { SharedModule } from '../shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { CardsModule } from '../cards/cards.module';
import { CapabilityComponent } from './capability/capability.component';
import { CapabilityListComponent } from './capability-list/capability-list.component';



@NgModule({
  declarations: [
    CapabilityComponent,
    CapabilityListComponent
  ],
  imports: [
    CommonModule,
    CapabilityRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule]
})
export class CapabilitysModule { }

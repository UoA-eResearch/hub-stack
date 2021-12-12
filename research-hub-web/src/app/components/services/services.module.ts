import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './services-routing.module';
import { ServiceComponent } from './service/service.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ServiceListComponent } from './service-list/service-list.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [ServiceComponent, ServiceListComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class ServicesModule { }

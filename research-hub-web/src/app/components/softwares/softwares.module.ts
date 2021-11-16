import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwaresComponent } from './softwares.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [SoftwaresComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class SoftwaresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class ServiceModule { }

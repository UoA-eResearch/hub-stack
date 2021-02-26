import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwaresComponent } from './softwares.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';

@NgModule({
  declarations: [SoftwaresComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SoftwaresModule { }

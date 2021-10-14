import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareComponent } from './software/software.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SoftwareListComponent } from './software-list/software-list.component';

@NgModule({
  declarations: [SoftwareComponent, SoftwareListComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SoftwaresModule { }

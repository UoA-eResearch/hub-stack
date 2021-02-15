import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubhubsRoutingModule } from './subhubs-routing.module';
import { SubhubsComponent } from './subhubs.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';

@NgModule({
  declarations: [SubhubsComponent],
  imports: [
    CommonModule,
    SubhubsRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SubhubsModule { }
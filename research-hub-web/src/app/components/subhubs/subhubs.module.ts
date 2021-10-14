import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubhubsRoutingModule } from './subhubs-routing.module';
import { SubhubComponent } from './subhub/subhub.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SubhubListComponent } from './subhub-list/subhub-list.component';

@NgModule({
  declarations: [SubhubComponent, SubhubListComponent],
  imports: [
    CommonModule,
    SubhubsRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SubhubsModule { }

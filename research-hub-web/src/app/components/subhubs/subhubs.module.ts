import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubhubsRoutingModule } from './subhubs-routing.module';
import { SubhubComponent } from './subhub/subhub.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SubhubListComponent } from './subhub-list/subhub-list.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [SubhubComponent, SubhubListComponent],
  imports: [
    CommonModule,
    SubhubsRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class SubhubsModule { }

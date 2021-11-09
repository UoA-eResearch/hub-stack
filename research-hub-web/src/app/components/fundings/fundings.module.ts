import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingsComponent } from './funding/funding.component';
import { FundingRoutingModule } from './funding-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { FundingListComponent } from './funding-list/funding-list.component';

@NgModule({
  declarations: [
    FundingsComponent,
    FundingListComponent
  ],
  imports: [
    CommonModule,
    FundingRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class FundingsModule { }

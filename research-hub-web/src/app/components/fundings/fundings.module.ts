import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingComponent } from './funding/funding.component';
import { FundingRoutingModule } from './funding-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { FundingPurposeComponent } from './funding-purpose/funding-purpose.component';
import { FundingDeadlinesComponent } from './funding-deadlines/funding-deadlines.component';
import { FundingListComponent } from './funding-list/funding-list.component';

@NgModule({
  declarations: [
    FundingComponent,
    FundingPurposeComponent,
    FundingDeadlinesComponent,
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

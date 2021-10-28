import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingsComponent } from './fundings.component';
import { FundingRoutingModule } from './funding-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { FundingPurposeComponent } from './funding-purpose/funding-purpose.component';
import { FundingDeadlinesComponent } from './funding-deadlines/funding-deadlines.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [
    FundingsComponent,
    FundingPurposeComponent,
    FundingDeadlinesComponent
  ],
  imports: [
    CommonModule,
    FundingRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class FundingsModule { }

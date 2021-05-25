import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingsComponent } from './fundings.component';
import { FundingRoutingModule } from './funding-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';



@NgModule({
  declarations: [
    FundingsComponent
  ],
  imports: [
    CommonModule,
    FundingRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class FundingsModule { }
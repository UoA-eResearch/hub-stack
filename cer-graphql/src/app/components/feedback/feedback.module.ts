import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';

import { SharedModule } from '@components/shared/app.shared.module';
import { FeedbackComponent } from './feedback.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedbackRoutingModule
  ],
  declarations: [
    FeedbackComponent
  ]
})
export class FeedbackModule {
}

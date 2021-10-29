import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyComponent } from './case-study.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';


@NgModule({
  declarations: [
    CaseStudyComponent
  ],
  imports: [
    CommonModule,
    CaseStudyRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class CasestudysModule { }

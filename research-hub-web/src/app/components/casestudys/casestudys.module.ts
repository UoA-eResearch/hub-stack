import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyComponent } from './case-study.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { CaseStudyReferencesComponent } from './case-study-references/case-study-references.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    CaseStudyComponent,
    CaseStudyReferencesComponent
  ],
  imports: [
    CommonModule,
    CaseStudyRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class CasestudysModule { }

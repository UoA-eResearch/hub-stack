import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesRoutingModule } from './processes-routing.module';
import { ProcessComponent } from './process/process.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ProcessListComponent } from './process-list/process-list.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    ProcessComponent,
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    ProcessesRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class ProcessesModule { }

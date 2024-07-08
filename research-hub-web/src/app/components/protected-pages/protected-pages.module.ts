import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedPagesRoutingModule } from './protected-pages-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ProtectedPagesListComponent } from './protected-pages-list/protected-pages-list.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    ProtectedPagesListComponent
  ],
  imports: [
    CommonModule,
    ProtectedPagesRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class ProtectedPagesModule { }

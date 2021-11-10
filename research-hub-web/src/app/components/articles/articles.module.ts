import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './article/article.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ArticleListComponent } from './article-list/article-list.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule,
    CardsModule
  ]
})
export class ArticlesModule { }

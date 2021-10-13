import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlesComponent } from './article/article.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: ':slug', component: ArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }

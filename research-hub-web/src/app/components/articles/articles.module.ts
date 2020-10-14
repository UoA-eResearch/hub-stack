import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { SharedModule } from '../shared/app.shared.module';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";


@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ]
})
export class ArticlesModule { }

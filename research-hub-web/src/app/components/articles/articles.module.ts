import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { AssetComponent } from '../asset/asset.component';
import { SharedModule } from '@components/shared/app.shared.module';


@NgModule({
  declarations: [
    ArticlesComponent,
    AssetComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule
  ]
})
export class ArticlesModule { }

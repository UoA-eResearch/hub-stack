import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';

import { HomeComponent } from './home.component';
import { BrowseComponent } from './browse/browse.component';
import { FeaturedComponent } from './featured/featured.component';
import { ResearchActivityComponent } from './research-activity/research-activity.component';
import { FeaturedComponent } from './featured/featured.component';
import { SharedModule } from '@components/shared/app.shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    HomeComponent,
    BrowseComponent,
    ResearchActivityComponent,
    FeaturedComponent
  ]
})
export class HomeModule {
}

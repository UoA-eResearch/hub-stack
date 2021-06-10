import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';

import { HomeComponent } from './home.component';
import { BrowseComponent } from './browse/browse.component';
import { FeaturedComponent } from './featured/featured.component';
import { ResearchActivityComponent } from './research-activity/research-activity.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { ContentTitleComponent } from './content-title/content-title.component';
import { ContentContainerComponent } from './content-container/content-container.component';


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
    FeaturedComponent,
    ContentTitleComponent,
    ContentContainerComponent
  ]
})
export class HomeModule {
}

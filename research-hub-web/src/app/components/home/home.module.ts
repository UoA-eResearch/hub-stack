import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';

import { HomeComponent } from './home.component';
import { FeaturedComponent } from './featured/featured.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { ContentTitleComponent } from './content-title/content-title.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { BannerImageComponent } from './banner-image/banner-image.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    HomeComponent,
    FeaturedComponent,
    ContentTitleComponent,
    ContentContainerComponent,
    BannerImageComponent,
    ContactComponent
  ]
})
export class HomeModule {
}

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NotificationComponent,
    FooterComponent,
    SearchBarComponent,
    SearchFiltersComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ScrollingModule
  ],
  exports: [
    NavbarComponent,
    NotificationComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class AppLayoutModule { }

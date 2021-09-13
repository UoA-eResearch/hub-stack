import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NotificationComponent,
    SideNavComponent,
    FooterComponent,
    SearchBarComponent,
    SearchFiltersComponent
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
    SideNavComponent
  ]
})
export class AppLayoutModule { }

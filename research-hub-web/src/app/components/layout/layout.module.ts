import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    SideNavComponent
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
    FooterComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    SideNavComponent
  ]
})
export class AppLayoutModule { }

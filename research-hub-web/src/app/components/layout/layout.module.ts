import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NotificationComponent,
    SideNavComponent,
    FooterComponent
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

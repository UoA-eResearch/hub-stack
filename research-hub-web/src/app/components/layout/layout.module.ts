import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class AppLayoutModule { }

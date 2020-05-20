import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './about.routing';

import {AboutComponent} from './about.component';
import {SharedModule} from 'app/components/shared/app.shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {
}

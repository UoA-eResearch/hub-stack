import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './content-details.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {ContentDetailsComponent} from './content-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ContentDetailsComponent
  ]
})
export class ContentDetailsModule {
}

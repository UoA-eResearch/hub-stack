import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './person-details.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {PersonDetailsComponent} from './person-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    PersonDetailsComponent
  ]
})
export class PersonDetailsModule {
}

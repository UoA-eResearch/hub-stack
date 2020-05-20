import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './org-unit-details.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {OrgUnitDetailsComponent} from './org-unit-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    OrgUnitDetailsComponent
  ]
})
export class OrgUnitDetailsModule {
}

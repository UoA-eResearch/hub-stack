import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './guide-category.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {GuideCategoryComponent} from './guide-category.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    GuideCategoryComponent
  ]
})
export class GuideCategoryModule {
}

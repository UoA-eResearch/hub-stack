import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './user-study.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {UserStudyComponent} from './user-study.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    UserStudyComponent
  ]
})
export class UserStudyModule {
}

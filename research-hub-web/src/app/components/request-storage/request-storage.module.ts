import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './request-storage.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {RequestStorageComponent} from './request-storage.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    RequestStorageComponent
  ]
})
export class RequestStorageModule {
}

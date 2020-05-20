import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './request-vm.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {RequestVmComponent} from './request-vm.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    RequestVmComponent
  ]
})
export class RequestVmModule {
}

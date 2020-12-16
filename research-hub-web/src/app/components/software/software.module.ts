import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareComponent } from './software.component';
import { SoftwareRoutingModule} from './software-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';



@NgModule({
  declarations: [SoftwareComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule
  ]
})
export class SoftwareModule { }

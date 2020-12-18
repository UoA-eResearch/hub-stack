import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareComponent } from './software.component';
import { SoftwareRoutingModule} from './software-routing.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';


@NgModule({
  declarations: [SoftwareComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SoftwareModule { }

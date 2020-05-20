import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './contact.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {ContactComponent} from './contact.component';
import {ImageViewComponent} from './image-view/image-view.component';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ContactComponent,
    ImageViewComponent,
    ImageViewDialogComponent
  ],
  entryComponents: [
    ImageViewDialogComponent
  ]
})
export class ContactModule {
}

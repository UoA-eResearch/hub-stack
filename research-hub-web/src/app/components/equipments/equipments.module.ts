import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './equipment/equipment.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';

@NgModule({
  declarations: [EquipmentComponent, EquipmentListComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class EquipmentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './equipment.component';
import { SharedModule } from '@components/shared/app.shared.module';

@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule
  ]
})
export class EquipmentModule { }

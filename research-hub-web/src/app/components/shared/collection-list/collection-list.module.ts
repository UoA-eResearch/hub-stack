import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionListComponent } from './collection-list.component';
import { SharedModule } from '../app.shared.module';
import { Routes, RouterModule, RouterLink } from '@angular/router';

@NgModule({
  declarations: [CollectionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CollectionListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardCardComponent } from './standard-card/standard-card.component';
import { DocumentCardComponent } from './document-card/document-card.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { OrgUnitCardComponent } from './org-unit-card/org-unit-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';



@NgModule({
  declarations: [
    StandardCardComponent,
    DocumentCardComponent,
    ContactCardComponent,
    OrgUnitCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    StandardCardComponent,
    DocumentCardComponent,
    ContactCardComponent,
    OrgUnitCardComponent
  ]
})
export class CardsModule { }

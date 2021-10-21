import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardCardComponent } from './standard-card/standard-card.component';
import { DocumentCardComponent } from './document-card/document-card.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { OrgUnitCardComponent } from './org-unit-card/org-unit-card.component';



@NgModule({
  declarations: [
    StandardCardComponent,
    DocumentCardComponent,
    ContactCardComponent,
    OrgUnitCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardsModule { }

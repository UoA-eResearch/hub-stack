import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  declarations: [],
  exports: [
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {
}

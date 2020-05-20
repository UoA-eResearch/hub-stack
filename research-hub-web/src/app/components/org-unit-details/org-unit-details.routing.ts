import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrgUnitDetailsComponent} from './org-unit-details.component';

const routes: Routes = [
  {path: '', component: OrgUnitDetailsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

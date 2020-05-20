import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonDetailsComponent} from './person-details.component';

const routes: Routes = [
  {path: '', component: PersonDetailsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

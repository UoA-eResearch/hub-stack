import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentDetailsComponent} from './content-details.component';

const routes: Routes = [
  {path: '', component: ContentDetailsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

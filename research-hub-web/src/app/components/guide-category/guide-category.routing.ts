import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuideCategoryComponent} from './guide-category.component';

const routes: Routes = [
  {path: '', component: GuideCategoryComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

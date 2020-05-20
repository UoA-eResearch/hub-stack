import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserStudyComponent} from './user-study.component';

const routes: Routes = [
  {path: '', component: UserStudyComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FeedbackComponent} from './feedback.component';

const routes: Routes = [
  {path: '', component: FeedbackComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

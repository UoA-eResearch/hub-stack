import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestStorageComponent} from './request-storage.component';
import {CanActivateViaAuthGuard} from '../../routing/routing.can-activate-via-auth-guard';
import {ConfirmDeactivateGuard} from '../../routing/routing.confirm-deactivate';

const routes: Routes = [
  {path: '', component: RequestStorageComponent, canActivate: [CanActivateViaAuthGuard], canDeactivate: [ConfirmDeactivateGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

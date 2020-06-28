import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestVmComponent} from './request-vm.component';
import {ConfirmDeactivateGuard} from '../../routing/routing.confirm-deactivate';
import {CanActivateViaAuthGuard} from '../../routing/routing.can-activate-via-auth-guard';

const routes: Routes = [
  {path: '', component: RequestVmComponent, canActivate: [CanActivateViaAuthGuard], canDeactivate: [ConfirmDeactivateGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

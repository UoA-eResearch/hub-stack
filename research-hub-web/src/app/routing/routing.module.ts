import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing';
import { CanActivateViaAuthGuard } from './routing.can-activate-via-auth-guard';
import { ConfirmDeactivateGuard } from './routing.confirm-deactivate';

import { AuthGuard, LoginSuccessGuard } from 'uoa-auth-angular';

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateViaAuthGuard,
    ConfirmDeactivateGuard,
    AuthGuard,
    LoginSuccessGuard
  ]
})
export class RoutingModule {
}

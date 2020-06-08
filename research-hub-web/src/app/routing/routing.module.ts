import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing';
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
    ConfirmDeactivateGuard,
    AuthGuard,
    LoginSuccessGuard
  ]
})
export class RoutingModule {
}

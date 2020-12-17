import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";
import { LoginService } from "@uoa/auth";
import { CerGraphqlService } from "../../services/cer-graphql.service";
import { SubHubRoutesComponent } from "./sub-hub-routes.component";

export function initializeApp(cerGraphqlService: CerGraphqlService, loginService: LoginService, router: Router) {
  router.routerState.snapshot.root.queryParams;
  return loginService.loginSuccess(router.routerState.snapshot).then(
    () => {
      return cerGraphqlService.pushSubHubRoutes();
    }
  )
}

const routes = [
  { path: '', component: SubHubRoutesComponent }
];


@NgModule({
  declarations: [
    SubHubRoutesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[

  ],
  exports: [
    SubHubRoutesComponent
  ]
})
export class SubHubRoutesModuleModule {
 }

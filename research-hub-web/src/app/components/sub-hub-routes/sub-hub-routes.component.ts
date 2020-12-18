import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '@uoa/auth';
import { CerGraphqlService } from "../../services/cer-graphql.service";

@Component({
  selector: 'app-sub-hub-routes',
  styleUrls: ['./sub-hub-routes.component.scss'],
  template: "<p></p>"
})
export class SubHubRoutesComponent implements OnInit {

  constructor(
    private router: Router,
    private cerGraphqlService: CerGraphqlService ,
    private loginService: LoginService
  ) { }

  async ngOnInit(): Promise<boolean> {
    if (!this.cerGraphqlService.hasPushedSubhubRoutes) {
      await this.loginService.loginSuccess(this.router.routerState.snapshot);
      console.log("Loading subhub routes");
      await this.cerGraphqlService.pushSubHubRoutes();
      const currentUrl = await this.router.url;
      console.log("Reloading");
      return this.router.navigateByUrl(currentUrl);
    } else {
      console.log("Genuine navigation error detected");
      return this.router.navigate(["/error/404"]);
    }
  }

}

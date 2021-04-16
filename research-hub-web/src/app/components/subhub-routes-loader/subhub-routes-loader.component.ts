import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CerGraphqlService } from "../../services/cer-graphql.service";

@Component({
  selector: 'app-subhub-routes-loader',
  styleUrls: ['./subhub-routes-loader.component.scss'],
  templateUrl: "./subhub-routes-loader.component.html"
})
export class SubHubRoutesLoaderComponent implements OnInit {

  constructor(
    private router: Router,
    private cerGraphqlService: CerGraphqlService ,
  ) { }

  async ngOnInit(): Promise<boolean> {
    if (!this.cerGraphqlService.hasPushedSubhubRoutes) {
      // If we haven't pushed the subhub routes yet, the route may
      // be a subhub route. Load subhub routes. 
      await this.cerGraphqlService.pushSubHubRoutes();
      const currentUrl = await this.router.url;
      // Then re-navigate and see if the route works.
      return this.router.navigateByUrl(currentUrl);
    } else {
      // Subhub routes are loaded, so this is genuinely an URL without
      // a path attached.
      return this.router.navigate(["/error/404"]);
    }
  }

}

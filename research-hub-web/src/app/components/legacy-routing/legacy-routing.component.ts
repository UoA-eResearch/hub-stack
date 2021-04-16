import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import legacyRoutes from './legacy-content-ids.json';

@Component({
  selector: 'app-legacy-routing',
  template:'<p></p>'
})
export class LegacyRoutingComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.redirectLegacyRoute();
  }
  
  private getLegacyContentType(): string {
    return this.router.url.split('/')[1];
  }

  private getLegacyContentId(contentType: string): string {
    switch(contentType) {
      case "content":
        return this.route.snapshot.paramMap.get("id");
      case "requestVm":
        return "requestVm";
      case "requestStorage":
        return "requestStorage";
    }
  }

  private redirectLegacyRoute(): void {
    try {
      const contentType = this.getLegacyContentType();
      const legacyId = this.getLegacyContentId(contentType);
      const redirect = legacyRoutes[legacyId];
      if (!redirect) {
        this.router.navigateByUrl("/error/404", {
          skipLocationChange: true,
          replaceUrl: true
        });
      } else {
        let url;
        if (typeof redirect === "string") {
          window.location.replace(redirect);
          return;
        } else {
          url = `/${redirect.contentType}/${redirect.slug}`;
          this.router.navigateByUrl(url, {
            skipLocationChange: true,
            replaceUrl: true
          });  
        }
      }
    } catch (e) {
      // We handle any errors with getting legacy routes by
      // redirecting to not found route.
      this.router.navigateByUrl("/error/404", {
        skipLocationChange: true,
        replaceUrl: true
      });  
    }
  }
}

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
    let legacyId;
    const contentType = this.router.url.split('/')[1];
    switch(contentType) {
      case "content":
        legacyId = this.route.snapshot.paramMap.get("id");
        break;
      case "requestVm":
        legacyId = "requestVm";
        break;
      case "requestStorage":
        legacyId = "requestStorage";
        break;
    }
    const redirect = legacyRoutes[legacyId];
    if (!redirect) {
      this.router.navigateByUrl("/error/404");
    } else {
      let url;
      if (typeof redirect === "string") {
        window.location.replace(redirect);
        return;
      } else {
        url = `/${redirect.contentType}/${redirect.slug}`;
      }
      this.router.navigateByUrl(url, {
        replaceUrl: true
      });
    }
  }

}

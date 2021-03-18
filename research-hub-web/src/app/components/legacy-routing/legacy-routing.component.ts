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
    const legacyId = this.route.snapshot.paramMap.get("id");
    const redirect = legacyRoutes[legacyId];
    if (!redirect) {
      this.router.navigateByUrl("/error/404");
    } else {
      let url;
      if (typeof redirect === "string") {
        url = redirect;
      } else {
        url = `/${redirect.contentType}/${redirect.slug}`;
      }
      this.router.navigateByUrl(url, {
        replaceUrl: true
      });
    }
  }

}

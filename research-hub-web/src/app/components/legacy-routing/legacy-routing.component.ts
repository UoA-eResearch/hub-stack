import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';
import legacyRoutes from './legacy-routes.json';

@Component({
  selector: 'app-legacy-routing',
  template:'<p>Redirecting...</p>',
  styleUrls: ['./legacy-routing.component.scss']
})
export class LegacyRoutingComponent implements OnInit {

  public redirects = {
    1: {
      "contentType": "service",
      "slug": "research-virtual-machines"
    }
  };

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const legacyId = this.route.snapshot.paramMap.get("id");
    const redirect = this.redirects[legacyId];
    if (!redirect) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl(`/${redirect.contentType}/${redirect.slug}`,{
        replaceUrl: true
      });
    }
  }

}

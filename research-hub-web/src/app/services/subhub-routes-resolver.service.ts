import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree,
  CanActivateChild
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { endWith, take } from "rxjs/operators";
import { CerGraphqlService } from "./cer-graphql.service";

@Injectable({
  providedIn: 'root'
})
export class SubhubRoutesResolverService implements Resolve<boolean>, CanActivate, CanActivateChild {

  constructor(private router: Router, private cerGraphqlService: CerGraphqlService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    // Run GraphQL query to get a list of sub hubs, then return a true.
    console.log("Resolve called.");
    return from(this.cerGraphqlService.pushSubHubRoutes().then(() => (true)));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Observable<UrlTree> {
    console.log("Can activate on wild card route called.");
    return from(this.cerGraphqlService.pushSubHubRoutes().then(
      () => {
        console.log("URL is ", state.url);
        return this.router.parseUrl(state.url);
      }
      // () => true
    ));
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Observable<UrlTree> {
    return this.canActivate(next, state);
  }

}

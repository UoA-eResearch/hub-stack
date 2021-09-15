import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { from, Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sideNav: MatSidenav;
  public currentUrl: string;

  public userInfo$: Observable<UserInfoDto>;
  public loggedIn$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe({
        next: (event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
        }
      })
    );

    this.loggedIn$ = from(this.loginService.isAuthenticated()).pipe(
      switchMap(() => this.loginService.loggedIn$)
    );

    this.userInfo$ = this.loginService.userInfo$.pipe(
      filter(userInfo => userInfo !== null && userInfo !== undefined),
      tap(userInfo => this.sendGoogleAnalyticsUserInfo(userInfo))
    );
  }

  private sendGoogleAnalyticsUserInfo(userInfo: UserInfoDto): void {
    window.dataLayer.push({
      'user': JSON.stringify(userInfo),
      ...userInfo,
    });

    // groups disabled for now, as there is a bug in the UoA auth library
    // if (userInfo.groups) {
    //   console.log(userInfo.groups);
    //   JSON.parse(`${userInfo.groups}`).map(group => {
    //     const groupObj = {};
    //     group = group.trim().split('.')[0];
    //     groupObj[group] = group;
    //     console.log(groupObj);
    //     window.dataLayer.push(groupObj);
    //   })
    // }
  }

  toggle(): void {
    this.sideNav.toggle();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

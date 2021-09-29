import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { HomeScrollService } from '@services/home-scroll.service';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { from, Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBar') searchBar: SearchBarComponent;

  public currentUrl = '/';
  public showMobileSearch = false;

  public userInfo$: Observable<UserInfoDto>;
  public loggedIn$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public homeScrollService: HomeScrollService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe({
        next: (event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
          this.searchBar.focus();
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

  public toggleMobileSearchBar(): void {
    this.showMobileSearch = !this.showMobileSearch;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

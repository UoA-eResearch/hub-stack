import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Category, Stage } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { from, Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() allCategories: Category[] = [];
  @Input() allStages: Stage[] = [];

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  public isHome = false;
  public currentUrl = '/';

  public userInfo$: Observable<UserInfoDto>;
  public loggedIn$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public homeScrollService: HomeScrollService,
    public searchBarService: SearchBarService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe({
        next: (event: NavigationEnd) => {
          this.isHome = event.urlAfterRedirects ? (event.urlAfterRedirects === '/home') : false;
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




  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { AllCategoriesGQL, AllStagesGQL, Category, Stage } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isHome = false;
  public currentUrl = '/';
  public allCategories: Category[] = [];
  public allStages: Stage[] = [];

  public userInfo: UserInfoDto | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public homeScrollService: HomeScrollService,
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL,
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


    this.subscriptions.add(
      this.loginService.userInfo$.pipe(
        filter(userInfo => userInfo !== null && userInfo !== undefined)
      ).subscribe(userInfo => {
        console.log('userInfo ', userInfo)
        this.userInfo = userInfo;
        this.sendGoogleAnalyticsUserInfo(userInfo)
      })
    );

    this.subscriptions.add(this.getAllCategories().subscribe((allCategories) => this.allCategories = allCategories));
    this.subscriptions.add(this.getAllStages().subscribe((allStages) => this.allStages = allStages));
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

  private getAllCategories(): Observable<Category[]> {
    return this.allCategoriesGQL.fetch().pipe(
      map((result) => result.data.categoryCollection.items)
    ) as Observable<Category[]>;
  }

  private getAllStages(): Observable<Stage[]> {
    return this.allStagesGQL.fetch().pipe(
      map((result) => result.data.stageCollection.items)
    ) as Observable<Stage[]>;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

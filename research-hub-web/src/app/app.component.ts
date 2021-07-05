import { filter, pluck, flatMap, catchError } from 'rxjs/operators';
import { Component, ContentChildren, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { NavigationEnd, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '@uoa/auth';
import { Location } from '@angular/common';
import { AppComponentService } from './app.component.service';
import { Title } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetHomepageGQL, Homepage, AllCategoriesGQL, CategoryCollection, AllStagesGQL, StageCollection } from './graphql/schema';
import smoothscroll from 'smoothscroll-polyfill';
import { HomeScrollService } from '@services/home-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  public viewIsLoaded: Boolean = false;


  public url: Subscription;
  public showNotification: Boolean;
  public showBanner: Boolean;
  public title: String;
  public summary: String;
  private mediaChangeSub: Subscription;
  private searchTextChangeSub: Subscription;
  private routerSub: Subscription;
  private titleSub: Subscription;
  private scrollSub: Subscription;
  public allCategories$: Observable<CategoryCollection>;
  public homepage$: Observable<Homepage>;
  public allStages$: Observable<StageCollection>;

  public searchText;
  public pageTitle = '';

  private previousRoute = undefined;
  private currentRoute = undefined;
  public currentUrl = undefined;

  public userInfo;
  public isMobile: Boolean;
  public onSearchPage: Boolean;
  public onHomePage: Boolean;
  public mobileBackground: String;
  public desktopBackground: String;

  @ContentChildren(RouterOutlet) outlet;

  constructor(
    private location: Location,
    public searchBarService: SearchBarService,
    private router: Router,
    private titleService: Title,
    public appComponentService: AppComponentService,
    public loginService: LoginService,
    public apollo: Apollo,
    public allCategoriesGQL: AllCategoriesGQL,
    public getHomepageGQL: GetHomepageGQL,
    public allStagesGQL: AllStagesGQL,
    private deviceService: DeviceDetectorService,
    public homeScrollService: HomeScrollService) {
      this.detectDevice();

      // Smooth scrolling in IE/Edge
      smoothscroll.polyfill();
    }

  // Detect if device is Mobile
  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  // Get formatted route name
  getRouteName(url: string) {
    this.appComponentService.getRouteSlug(url);
    const routeName = url.replace('?', '/');
    return routeName.split('/')[1];
  }

  // Navigate back from within the ResearchHub
  back() {
    if (this.previousRoute) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  async ngOnInit() {
    this.searchText = '';
    this.title = "Welcome to the ResearchHub"
    this.summary = "The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research."

    this.titleSub = this.appComponentService.titleChange.subscribe((title) => {
      this.pageTitle = title;
      this.titleService.setTitle(this.pageTitle + ' | ResearchHub');
    });

    this.initialiseHashUrlRedirect();

    if (isPlatformBrowser) {
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(async event => {
    // Get All Categories
    if (!this.allCategories$) {
    this.allCategories$ = this.getAllCategories();

    // Set Event Id used for search filtering
    this.allCategories$.subscribe(data => {
      data.items.forEach(element => {
        if (element.name == 'Events') this.searchBarService.setEventId(element.sys.id);
      });
    })
    }
    // Get All Stages
    if (!this.allStages$) {
        this.allStages$ = this.getAllStages();
    }
          // Need to use urlAfterRedirects rather than url to get correct routeName, even when route redirected automatically
          const url = event['urlAfterRedirects'];
          const routeName = this.getRouteName(url);
          this.currentUrl = url;

          // Check if the user is logged in now (Cognito redirect)
          this.loginService.isAuthenticated().then(data => {
            this.getHomepageData();
          });
          this.userInfo = await this.loginService.getUserInfo();

          window.dataLayer.push({
            'user': JSON.stringify(this.userInfo),
            ...this.userInfo,
          });

          // pushing an individual usergroupss to google analytics
          if (this.userInfo.groups) {
            this.userInfo.groups.trim().replace('\"', '').replace(']', '').replace('[', '').split(',').map(group => {
              let groupObj = {};
              group = group.trim().split('.')[0];
              groupObj[group] = group;
              window.dataLayer.push(groupObj);
            })
          }

          if (routeName) {

            // Set title if we're on the homepage
            if (['home'].includes(routeName)) this.appComponentService.setTitle('Welcome to the ResearchHub');

            // Update previous and current routes
            if (this.currentRoute) {
              this.previousRoute = this.currentRoute;
            }

            // Set current route name
            this.currentRoute = routeName;

            // Hide search options if we're on the search page
            this.onSearchPage = ['search'].includes(routeName);

            // Change navbar links 'Research Categories' and 'Research Activities' to scroll if on homepage otherwise expansion panel
            this.onHomePage = ['home', 'home#'].includes(routeName);

            // Show banner if we're on the homepage
            this.showBanner = this.onHomePage == true;

            // Same component navigation
            if (this.currentRoute == this.previousRoute) {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.navigate([url]);
            }
          }
        });
    }
  }


  private initialiseHashUrlRedirect() {
    //When the url changes, we check if actual url has a "#" in it, then we redirect to the route without it.
    // Redirect hash-style URLs of the old ResearchHub to the new style.
    this.router.events.subscribe((event: RouterEvent): void => {
      if (!this.router.navigated && event instanceof NavigationStart) {
        const url = event.url;
        if (url.match('^/#/')) {
          this.router.navigateByUrl(url.replace('#/', ''), {replaceUrl: true});
        }
      }
    });
  }

  /**
   * Get Homepage data from Contetnful after checking if the user is logged in
   */
  getHomepageData() {
    // Get Homepage Image
    this.homepage$ = this.getHomepage();
    this.homepage$.subscribe(data => {

      if (data.notification) {

        // Show notification if we're on the homepage
        this.showNotification = ['home', 'home#'].includes(this.currentRoute);
      }

      // Set background for mobile devices
      this.mobileBackground = `background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) ), url(${ data.image?.url }) no-repeat; height: 100vh`;

      // Set background for desktop devices
      this.desktopBackground = `background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) ), url(${ data.image?.url }) no-repeat fixed center; height: 100vh`;

      this.viewIsLoaded = true;
    });
  }

  // Get Query Parameters
  getQueryParams(item: any) {
    switch (item.__typename) {
      case 'Stage':
        try { return { researchActivities: [item.displayOrder] }; }
        catch { break; }
      case 'Category':
        try { return { researchCategories: [item.displayOrder] }; }
        catch { break; }
    }
  }

  // Get all research categories
  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  // Get all research stages
  public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }

  // Get homepage
  public getHomepage(): Observable<Homepage> {
    try {
      return this.getHomepageGQL.fetch()
        .pipe(flatMap(x => x.data.homepageCollection.items)) as Observable<Homepage>
    } catch (e) { console.error('Error loading homepage:', e) };
  }

  // Search
  search() {
    this.searchBarService.setSearchText(this.searchText);
    this.searchBarService.setCurrentPage(1);
    this.router.navigate(['/search']);
  }

  ngOnDestroy() {
    try {
      this.mediaChangeSub.unsubscribe();
      this.searchTextChangeSub.unsubscribe();
      this.routerSub.unsubscribe();
      this.titleSub.unsubscribe();
      this.scrollSub.unsubscribe();
      this.url.unsubscribe();
    } catch {}
  }



  // Reset Search Bar content
  clearSearchText() {
    this.searchText = '';
    this.searchBarService.setSearchText('');
  }
}

import { filter, pluck, flatMap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Observable, Subscriber } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { format } from 'date-fns';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { Location } from '@angular/common';
import { AppComponentService } from './app.component.service';
import { Title } from '@angular/platform-browser';
import { BypassErrorService } from '@uoa/error-pages';
import { Apollo } from 'apollo-angular';
import { environment } from '@environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GetHomepageGQL, Homepage, AllCategoriesGQL, CategoryCollection, AllStagesGQL, StageCollection } from './graphql/schema';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public aboutUs = "https://www.eresearch.auckland.ac.nz/?_ga=2.69549080.943707055.1614124973-1995817083.1603163706#";

  public homeUrl = '/home';
  public aucklandUniUrl = 'https://auckland.ac.nz';
  public eResearchUrl = 'http://eresearch.auckland.ac.nz';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';
  public privacyUrl = 'https://www.auckland.ac.nz/en/privacy.html';

  public url: Subscription;
  public showBanner: Boolean;
  public title: String;
  public summary: String;
  private mediaChangeSub: Subscription;
  private searchTextChangeSub: Subscription;
  private routerSub: Subscription;
  private titleSub: Subscription;
  private scrollSub: Subscription;
  private winResizeSub: Subscription;
  public allCategories$: Observable<CategoryCollection>;
  public homepage$: Observable<Homepage>
  public allStages$: Observable<StageCollection>;

  public searchText = '';
  public pageTitle = '';

  private previousRoute = undefined;
  private currentRoute = undefined;
  public currentUrl = undefined;

  public userInfo;
  public authenticated: Boolean;
  public isMobile: Boolean;
  public onSearchPage: Boolean;
  public mobileBackground: String;
  public desktopBackground: String;

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
    private _bypass: BypassErrorService,
    private deviceService: DeviceDetectorService) {
      this.detectDevice();
      this._bypass.bypassError(environment.cerGraphQLUrl, [500]);

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
    this.title = "Welcome to the ResearchHub"
    this.summary = "The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research."

    this.titleSub = this.appComponentService.titleChange.subscribe((title) => {
      this.pageTitle = title;
      this.titleService.setTitle(this.pageTitle + ' | ResearchHub');
    });

    // Get All Categories
    this.allCategories$ = this.getAllCategories();

    // Get All Stages
    this.allStages$ = this.getAllStages();

    // Get Homepage Image
    this.homepage$ = this.getHomepage();
    this.homepage$.subscribe(data => {

      // If mobile
      this.mobileBackground = `background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) ), url(${ data.image?.url }) no-repeat; height: 100vh`;

      // If desktop
      this.desktopBackground = `background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) ), url(${ data.image?.url }) no-repeat fixed center; height: 100vh`;
    
    });
    

    if (isPlatformBrowser) {
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(async event => {
          
          // Need to use urlAfterRedirects rather than url to get correct routeName, even when route redirected automatically
          const url = event['urlAfterRedirects'];
          const routeName = this.getRouteName(url);
          this.currentUrl = url;

          // Check if the user is logged in now (Cognito redirect)
          this.authenticated = await this.loginService.isAuthenticated();
          this.userInfo = await this.loginService.getUserInfo();

          if (routeName) {
            // Show banner if we're on the homepage
            this.showBanner = ['home', 'home#'].includes(routeName);

            // Set title if we're on the homepage
            if (['home', 'search'].includes(routeName)) this.appComponentService.setTitle('Welcome to the ResearchHub');

            // Update previous and current routes
            if (this.currentRoute) {
              this.previousRoute = this.currentRoute;
            }

            // Set current route name
            this.currentRoute = routeName;

            // Hide search options if we're on the search page
            this.onSearchPage = ['search'].includes(routeName);
            
            // Same component navigation
            if (this.currentRoute == this.previousRoute) {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.navigate([url]);
            }
          }
        });
    }
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
    this.router.navigate(['/search']);
  }

  ngOnDestroy() {
    this.mediaChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.titleSub.unsubscribe();
    this.scrollSub.unsubscribe();
    this.winResizeSub.unsubscribe();
    this.url.unsubscribe();
  }

  // Get year for footer copyright
  getYear() {
    return format(new Date(), 'yyyy');
  }

  // Reset Search Bar content
  clearSearchText() {
    this.searchText = '';
    this.searchBarService.setSearchText('');
  }
}
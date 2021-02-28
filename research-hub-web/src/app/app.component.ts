import { filter, distinctUntilChanged, pluck, flatMap } from 'rxjs/operators';
import { 
  Component, 
  OnDestroy, 
  OnInit, 
  ViewEncapsulation,
} from '@angular/core';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { format } from 'date-fns';
import { LoginService } from '@uoa/auth';
import { Location } from '@angular/common';
import { AppComponentService } from './app.component.service';
import { Title } from '@angular/platform-browser';
import { BypassErrorService } from '@uoa/error-pages';
import { Apollo } from 'apollo-angular';
import {
  GetHomepageGQL,
  Homepage,
  AllCategoriesGQL,
  CategoryCollection,
  AllStagesGQL,
  StageCollection
} from './graphql/schema';
import { environment } from '@environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { trigger, transition, style, animate } from '@angular/animations';


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

  public aucklandUniUrl = 'https://auckland.ac.nz';
  public eResearchUrl = 'http://eresearch.auckland.ac.nz';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';

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
  public showFilterButton = false;
  public showProgressBar = false;
  public showBackBtn = false;
  public pageTitle = '';

  private previousRoute = undefined;
  private currentRoute = undefined;

  public userInfo;
  public authenticated;
  public isMobile: Boolean;
  public mobileBackground;
  public desktopBackground;

  constructor(
    private location: Location, 
    private searchBarService: SearchBarService, 
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
    }
    public isLoading = true;

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

  async ngOnInit() {
    this.title = "Welcome to the ResearchHub"
    this.summary = "The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research."

    this.titleSub = this.appComponentService.titleChange.subscribe((title) => {
      this.pageTitle = title;
      this.titleService.setTitle(this.pageTitle + ' | ResearchHub');
    });

    // Navigate to the search page if user starts typing
    this.searchTextChangeSub = this.searchBarService.searchTextChange.pipe(distinctUntilChanged()).subscribe(searchText => {
      const url = this.location.path();
      if (url && !url.startsWith('/search') && searchText != null && searchText !== '') {
        this.router.navigate(['/search'], {
          queryParams: {
            categoryId: this.searchBarService.category,
            searchText: this.searchBarService.searchText
          }
        });
      }
    });

    // Get All Categories
    this.allCategories$ = this.getAllCategories();

    // Get All Stages
    this.allStages$ = this.getAllStages();

    // Get Homepage Image
    this.getHomepage().subscribe(data => {

      // If mobile
      this.mobileBackground = `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05) ), url(${ data.image?.url }) no-repeat; height: 100vh`;

      // If desktop
      this.desktopBackground = `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05) ), url(${ data.image?.url }) no-repeat fixed center; height: 100vh`;
    
    });
    

    if (isPlatformBrowser) {
      this.routerSub = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(async event => {
          
          // Need to use urlAfterRedirects rather than url to get correct routeName, even when route redirected automatically
          const url = event['urlAfterRedirects'];
          const routeName = this.getRouteName(url);

          // Check if the user is logged in now (Cognito redirect)
          this.authenticated = await this.loginService.isAuthenticated();
          this.userInfo = await this.loginService.getUserInfo();

          if (routeName) {
            this.showBanner = ['home', 'home#'].includes(routeName);
            this.searchBarService.setVisibility(['home', 'search'].includes(routeName));
            if (['home', 'search'].includes(routeName)) this.appComponentService.setTitle('Welcome to the ResearchHub');

            // Update previous and current routes
            if (this.currentRoute) {
              this.previousRoute = this.currentRoute;
            }

            // Set current route name
            this.currentRoute = routeName;
          
            // Same component navigation
            if (this.currentRoute == this.previousRoute) {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.navigate([url]);
            }

            // Show back button if we're not in /home
            this.showBackBtn = routeName !== 'home';
            this.showFilterButton = routeName === 'search';
          }
        });
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

  ngOnDestroy() {
    this.mediaChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.titleSub.unsubscribe();
    this.scrollSub.unsubscribe();
    this.winResizeSub.unsubscribe();
    this.url.unsubscribe();
  }

  getYear() {
    return format(new Date(), 'yyyy');
  }

  clearSearchText() {
    this.searchText = '';
  }
}
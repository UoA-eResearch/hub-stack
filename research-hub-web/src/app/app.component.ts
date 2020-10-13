
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { CategoryId, OptionsService, OptionType } from './services/options.service';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime, tap, pluck, map } from 'rxjs/operators';
import { ResearchHubApiService } from './services/research-hub-api.service';
import { AnalyticsService } from './services/analytics.service';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { format } from 'date-fns';
import { LoginService } from '@uoa/auth';

import { HeaderService } from './components/header/header.service';
import { Location } from '@angular/common';
import { AppComponentService } from './app.component.service';
import { Title } from '@angular/platform-browser';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BypassErrorService } from '@uoa/error-pages';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {
  AllEquipmentGQL,
  EquipmentCollection,
  Equipment,
  ArticleCollection,
  AllEquipmentQuery,
  EquipmentUserFacingSupportCollectionArgs
} from './graphql/schema';
import { env } from 'process';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('contentPushLeft', [
      state('true', style({
        marginLeft: '400px'
      })),
      state('false', style({
        marginLeft: '0'
      })),
      transition('false => true', animate('500ms  cubic-bezier(.63,.66,.47,.9)')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  public aucklandUniUrl = 'https://auckland.ac.nz';
  public eResearchUrl = 'http://eresearch.auckland.ac.nz';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';

  private mediaChangeSub: Subscription;
  private searchTextChangeSub: Subscription;
  private routerSub: Subscription;
  private progressBarVisibilitySub: Subscription;
  private titleSub: Subscription;
  private contentSidenavVisibilitySub: Subscription;
  private scrollSub: Subscription;
  private winResizeSub: Subscription;

  public selectedCategory = CategoryId.All;
  public searchText = '';
  public showFilterButton = false;
  public showLoginBtn = true;
  public showProgressBar = false;
  public showBackBtn = false;
  public pageTitle = '';

  private previousRoute = undefined;
  private currentRoute = undefined;
  public isContentSidenavFixed = false;
  public contentSidenavHeight = 0;

  @ViewChild('topbar', { static: true })
  private topbarElement: ElementRef;

  @ViewChild('topContent', { static: true })
  private topContentElement: ElementRef;

  @ViewChild('content', { static: true })
  private contentElement: ElementRef;
  private contentElementHeight: number;

  public userInfo;
  public authenticated;

  constructor(private location: Location, public optionsService: OptionsService, private headerService: HeaderService,
    private searchBarService: SearchBarService, private router: Router,
    public apiService: ResearchHubApiService, public analyticsService: AnalyticsService,
    private ref: ChangeDetectorRef, public appComponentService: AppComponentService,
    private titleService: Title,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    public loginService: LoginService,
    public apollo: Apollo,
    public allEquipmentGQL: AllEquipmentGQL,
    private _bypass: BypassErrorService) {
    this._bypass.bypassError(environment.cerGraphQLUrl, [500]);
  }

  getSearchQueryParams(item: any) {
    return item['type'] === OptionType.Category ? { categoryId: item.id } : { researchActivityIds: [item.id] };
  }

  getRouteName(url: string) {
    const routeName = url.replace('?', '/');
    return routeName.split('/')[1];
  }

  back() {
    if (this.previousRoute) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  setContentSidenavHasContent(hasContent: boolean) {
    this.appComponentService.setContentSidenavHasContent(hasContent);
  }

  /**
   * Sets the page title, and enables/disables the search bar and header.
   * Also sets any custom CSS for the page.
   * @param pageInfo currentPage information object.
   */
  setTitleSearchBarHeaderCustomCSS(pageInfo: any) {
    if (pageInfo.title) {
      this.titleService.setTitle('ResearchHub: ' + this.pageTitle);
    }
    this.headerService.setBatchParams(pageInfo.title, pageInfo.description, pageInfo.imageUrl, pageInfo.isHeaderVisible);
    this.searchBarService.setVisibility(pageInfo.isSearchBarVisible);
    this.appComponentService.setCustomCSSClassName(pageInfo.customCSSClassName);
  }

  async ngOnInit() {
    this.titleSub = this.appComponentService.titleChange.subscribe((title) => {
      this.pageTitle = title;
      this.setTitleSearchBarHeaderCustomCSS(this.optionsService.getPageInfo(this.currentRoute, this.pageTitle));
    });

    this.progressBarVisibilitySub = this.appComponentService.progressBarVisibilityChange.subscribe((isVisible) => {
      this.showProgressBar = isVisible;
    });

    // Navigate to the search page if the user types text in
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
            // Update previous and current routes
            if (this.currentRoute) {
              this.previousRoute = this.currentRoute;
            }
            this.currentRoute = routeName;

            this.showBackBtn = routeName !== 'home';

            this.appComponentService.setProgressBarVisibility(false);
            const pageInfo = this.optionsService.getPageInfo(routeName);

            if (pageInfo) {
              this.pageTitle = pageInfo.title;

              // Track page view for pages with pre-defined titles
              if (pageInfo.title) {
                this.analyticsService.trackPageView(url, pageInfo.title);
              }

              this.setTitleSearchBarHeaderCustomCSS(this.optionsService.getPageInfo(this.currentRoute, this.pageTitle));
            } else {
              console.log('Error pageInfo not set for route:', routeName);
            }

            this.showFilterButton = routeName === 'search';
            window.scrollTo(0, 0); // TODO: remove or change when this pull request is merged https://github.com/angular/angular/pull/20030
          }
        });
    }
  }

  restyleContentSidenav() {
    if (!this.appComponentService.isContentSidenavVisible) {
      // If content sidenav is not visible, don't need to calculate style.
      return;
    }
    const topbar = this.topbarElement.nativeElement,
      topContent = this.topContentElement.nativeElement,
      topbarRect = topbar.getBoundingClientRect(),
      contentHeight = topContent.clientHeight,
      topbarBottom = topbarRect.bottom,
      winY = window.pageYOffset,
      winHeight = window.innerHeight;
    let newFixedValue, newSidenavHeight;
    if (topbarBottom < 0) {
      // The topbar is now scrolled out of view, so we need to affix the
      // content sidenav if it is not affixed.
      if (!this.isContentSidenavFixed) {
        newFixedValue = true;
      }
    } else {
      // The topbar is now in view, so we need to un-affix the content
      // sidenav if it is affixed.
      if (this.isContentSidenavFixed) {
        newFixedValue = false;
      }
    }
    // We calculate the height of the affixed content sidenav so that the sidenav does not
    // overlap with the footer.
    newSidenavHeight = Math.min(contentHeight - winY, winHeight);

    if ((newFixedValue === false) || (newFixedValue === undefined && !this.isContentSidenavFixed)) {
      // If the sidenav is not yet fixed - i.e. some of the topbar is still visible,
      // remove the visible topbar height from the sidenav height.
      newSidenavHeight -= topbarBottom;
    }
    this.ngZone.runGuarded(() => {
      setTimeout(() => {
        if (newFixedValue !== undefined) {
          this.isContentSidenavFixed = newFixedValue;
        }
        if (newSidenavHeight !== undefined) {
          this.contentSidenavHeight = newSidenavHeight;
        }
      }, 0);
    });
  }

  setupContentSidenav() {
    // If not running in a browser, do not do any listener setup.
    if (!isPlatformBrowser) {
      return;
    }
    this.contentSidenavVisibilitySub = this.appComponentService.contentSidenavVisibility$.subscribe((isVisible) => {
      // Sets if we pop out the content sidenav.
      if (isVisible) {
        // Do a restyle when the filter sidenav opens to initialise the height.
        this.restyleContentSidenav();
      }
    });
    const restyleFn = () => (this.restyleContentSidenav());
    this.scrollSub = this.scrollDispatcher.scrolled(150).subscribe(restyleFn);
    this.winResizeSub = fromEvent(window, 'resize').pipe(debounceTime(150)).subscribe(restyleFn);
    this.contentElementHeight = this.contentElement.nativeElement.clientHeight;
  }

  checkContentHeightChanged() {
    if (!this.appComponentService.isContentSidenavVisible) {
      // If content sidenav is not visible, don't need to calculate style.
      return;
    }

    const contentHeight = this.contentElement.nativeElement.clientHeight;
    if (contentHeight !== this.contentElementHeight) {
      // Recompute content sidenav size when the content has changed.
      this.restyleContentSidenav();
      setTimeout(() => {
        this.contentElementHeight = contentHeight;
      }, 0);
    }
  }

  ngAfterViewInit() {
    this.setupContentSidenav();
  }

  ngAfterViewChecked() {
    this.checkContentHeightChanged();
  }

  ngOnDestroy() {
    this.mediaChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.progressBarVisibilitySub.unsubscribe();
    this.titleSub.unsubscribe();
    this.contentSidenavVisibilitySub.unsubscribe();
    this.scrollSub.unsubscribe();
    this.winResizeSub.unsubscribe();
  }

  getYear() {
    return format(new Date(), 'yyyy');
  }
}

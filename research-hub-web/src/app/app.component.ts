import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllCategoriesGQL, AllStagesGQL, Category, Stage } from './graphql/schema';
import { PageTitleService } from './services/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  public allCategories: Category[];
  public allStages: Stage[];

  constructor(
    private router: Router,
    public titleService: PageTitleService,
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL
  ) { }


  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.titleService.title = ''; //sets title to welcome message

    this.subscriptions.add(this.getAllCategories().subscribe((allCategories) => this.allCategories = allCategories));
    this.subscriptions.add(this.getAllStages().subscribe((allStages) => this.allStages = allStages));
  }

  private subscribeToRouterEvents() {
    this.subscriptions.add(
      this.router.events.subscribe((event: RouterEvent): void => {
        if (!this.router.navigated && event instanceof NavigationStart) {
          this.hashUrlRedirect(event.url);
        }

        if (event instanceof NavigationEnd) {
          this.resetScrollPosition();
        }
      })
    );
  }

  /**
   * Resets scroll position to top when navigating
   * from https://github.com/angular/material.angular.io/blob/8f9c8ef09665fce8be71e35f8339a7e0b1565b4a/src/app/material-docs-app.ts
   */
  private resetScrollPosition() {
    if (typeof document === 'object' && document) {
      const sidenavContent = document.querySelector('.mat-drawer-content');
      if (sidenavContent) {
        sidenavContent.scrollTop = 0;
      }
    }
  }

  /**
   * When the url changes, we check if actual url has a "#" in it, then we redirect to the route without it.
   * Redirect hash-style URLs of the old ResearchHub to the new style.
   */
  private hashUrlRedirect(url: string): void {
    if (url.match('^/#/')) {
      this.router.navigateByUrl(url.replace('#/', ''), { replaceUrl: true });
    }
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

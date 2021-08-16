import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
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
    this.initialiseHashUrlRedirect();
    this.titleService.title = ''; //sets title to welcome message

    this.subscriptions.add(this.getAllCategories().subscribe((allCategories) => this.allCategories = allCategories));
    this.subscriptions.add(this.getAllStages().subscribe((allStages) => this.allStages = allStages));
  }


  /**
   * When the url changes, we check if actual url has a "#" in it, then we redirect to the route without it.
   * Redirect hash-style URLs of the old ResearchHub to the new style.
   */
  private initialiseHashUrlRedirect() {
    this.router.events.subscribe((event: RouterEvent): void => {
      if (!this.router.navigated && event instanceof NavigationStart) {
        const url = event.url;
        if (url.match('^/#/')) {
          this.router.navigateByUrl(url.replace('#/', ''), { replaceUrl: true });
        }
      }
    });
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

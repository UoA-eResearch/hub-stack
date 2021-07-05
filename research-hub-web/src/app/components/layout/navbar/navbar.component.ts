import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { AllCategoriesGQL, AllStagesGQL, Category, Stage } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { LoginService } from '@uoa/auth';
import { Observable } from 'rxjs';
import { filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isHome = false;
  public currentUrl: string = '/';
  public allCategories$: Observable<Category[]> | null = null;
  public allStages$: Observable<Stage[]> | null = null;

  constructor(
    private router: Router,
    public homeScrollService: HomeScrollService,
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL,
    public searchBarService: SearchBarService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHome = event.urlAfterRedirects ? (event.urlAfterRedirects === '/home') : false;
      this.currentUrl = event.urlAfterRedirects;
    });

    this.allCategories$ = this.getAllCategories();
    this.allStages$ = this.getAllStages();
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

}

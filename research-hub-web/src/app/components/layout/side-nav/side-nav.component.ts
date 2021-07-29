import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Category, Stage } from '@app/graphql/schema';
import { LoginService } from '@uoa/auth';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sideNav: MatSidenav;
  @Input() allCategories: Category[] = [];
  @Input() allStages: Stage[] = [];
  public currentUrl: string;

  private subscriptions: Subscription = new Subscription();

  public allCategories$: Observable<Category[]> | null = null;
  public allStages$: Observable<Stage[]> | null = null;

  constructor(
    private router: Router,
    public searchBarService: SearchBarService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe({
        next: (event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;
        }
      })
    )
  }

  toggle(): void {
    this.sideNav.toggle();
  }

  searchByCategory(id: string) {
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory([id]);
    console.log(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

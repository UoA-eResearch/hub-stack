import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PageTitleService } from './services/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public titleService: PageTitleService
  ) { }


  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.titleService.title = ''; //sets title to welcome message
  }

  private subscribeToRouterEvents() {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart || event instanceof NavigationEnd)
      ).subscribe((event: RouterEvent): void => {
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
      const sidenavContent = document.querySelector('.main-content');
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

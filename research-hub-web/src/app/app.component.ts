import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '@uoa/auth';
import { PageTitleService } from './services/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription =  new Subscription();

  constructor(
    private router: Router,
    public titleService: PageTitleService,
    public loginService: LoginService,
  ) { }


  ngOnInit(): void {
    this.initialiseHashUrlRedirect();
    this.titleService.title = ''; //sets title to welcome message
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

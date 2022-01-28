import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { PageTitleService } from './services/page-title.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SwUpdate, UnrecoverableStateEvent, VersionDetectedEvent, VersionEvent, VersionInstallationFailedEvent, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    public titleService: PageTitleService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.titleService.title = ''; //sets title to welcome message
    this.enableServiceWorker();
  }

  subscribeToRouterEvents() {
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

  enableServiceWorker() {
    if (!this.swUpdate.isEnabled) return; // if the service worker isn't active

    this.subscriptions.add(this.swUpdate.versionUpdates.pipe(
      filter((event: VersionEvent): event is VersionReadyEvent => event.type === 'VERSION_READY'),
      mergeMap((event: VersionReadyEvent) => {
        console.log('The current version is', event.currentVersion.hash);
        console.log('The latest version is', event.latestVersion.hash);
        return this.openSnackBar('There is a new version of the ResearchHub available!', 'Update').afterDismissed()
      }),
      mergeMap(() => this.swUpdate.activateUpdate())
    ).subscribe({
      next: (activated) => {
        if (activated) {
          console.log('Updated successfully.');
          // Calling activateUpdate() without reloading the page could break lazy-loading
          // in a currently running app, especially if the lazy-loaded chunks use filenames
          // with hashes, which change every version. Therefore, it is recommended to reload
          // the page once the promise returned by activateUpdate() is resolved.
          // https://angular.io/guide/service-worker-communications#forcing-update-activation
          window.location.reload();
        } else {
          console.log('Client already on latest version.');
        }
      },
      error: (error) => console.error('Error updating to latest version. ', error)
    }));

    this.subscriptions.add(this.swUpdate.versionUpdates.pipe(
      filter((event: VersionEvent): event is VersionDetectedEvent => event.type === 'VERSION_DETECTED')
    ).subscribe(() => {
      console.log('A new version of the ResearchHub has been detected.');
    }));

    this.subscriptions.add(this.swUpdate.versionUpdates.pipe(
      filter((event: VersionEvent): event is VersionInstallationFailedEvent => event.type === 'VERSION_INSTALLATION_FAILED')
    ).subscribe((event: VersionInstallationFailedEvent) => {
      console.error(`Error installing ResearchHub version ${event.version.hash}: ${event.error}`);
    }));

    // https://angular.io/guide/service-worker-communications#handling-an-unrecoverable-state
    this.subscriptions.add(this.swUpdate.unrecoverable.subscribe((event: UnrecoverableStateEvent) => {
      console.error(`Service worker error occurred: ${event.reason}`);
      window.location.reload();
    }));
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

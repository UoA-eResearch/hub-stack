import { Injectable } from '@angular/core';
import { SwUpdate, UnrecoverableStateEvent, VersionEvent } from '@angular/service-worker';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, TextOnlySnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SwUpdatesService {
  snackBarRef: MatSnackBarRef<TextOnlySnackBar>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private swu: SwUpdate,
    private snackBar: MatSnackBar
  ) { }

  enable() {
    if (!this.swu.isEnabled) return; // if the service worker isn't active

    this.swu.versionUpdates.subscribe((event: VersionEvent) => {
      
      if (event.type === "VERSION_DETECTED") {
        console.log('A new version of the ResearchHub has been detected.');
      }

      if (event.type === "VERSION_READY") {
        console.log('The current version is', event.currentVersion.hash);
        console.log('The latest version is', event.latestVersion.hash);
        this.openSnackBar('There is a new version of the ResearchHub available!', 'Update');
      }

      if (event.type === "VERSION_INSTALLATION_FAILED") {
        console.error(`Error installing ResearchHub version ${event.version.hash}: ${event.error}`);
      }
      
    });

    // https://angular.io/guide/service-worker-communications#handling-an-unrecoverable-state
    this.swu.unrecoverable.subscribe((event: UnrecoverableStateEvent) => {
      console.error(`Service worker error occurred: ${event.reason}`);
      window.location.reload();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.activateUpdate();
    });
  }

  activateUpdate() {
    this.swu.activateUpdate()
      .then((activated) => {
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
      })
      .catch((error) => console.error('Error updating to latest version. ', error))
  }
}

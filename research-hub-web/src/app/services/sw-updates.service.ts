import { Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SwUpdatesService {

  constructor(
    private swu: SwUpdate
  ) { }

  enable() {
    if (!this.swu.isEnabled) return; // if the service worker isn't active

    this.swu.versionUpdates.subscribe((event) => {
      
      if (event.type === "VERSION_DETECTED") {
        console.log('A new version of the ResearchHub has been detected.');
      }

      if (event.type === "VERSION_READY") {
        console.log('The current version is', event.currentVersion);
        console.log('The latest version is', event.latestVersion);
        if (confirm('A new version of ResearchHub is available. Would you like to update now?')) {
          this.activateUpdate();
        }
      }

      if (event.type === "VERSION_INSTALLATION_FAILED") {
        console.error(`Error installing ResearchHub version ${event.version}: ${event.error}`);
      }
      
    });

    // handle unrecoverable states
    // https://angular.io/guide/service-worker-communications#handling-an-unrecoverable-state
    this.swu.unrecoverable.subscribe((event) => {
      console.error(`Service worker error occurred: ${event.reason}`);
      window.location.reload();
    })
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

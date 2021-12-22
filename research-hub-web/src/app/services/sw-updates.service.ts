import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdatesService {

  constructor(
    private swu: SwUpdate
  ) { }

  enable() {
    // if the service worker isn't active
    if (!this.swu.isEnabled) return;

    // note that swupdate methods used in docs examples (https://angular.io/guide/service-worker-communications) have been deprecated. documentation is not up to date. 

    // detect available updates
    this.swu.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      if (confirm('A new version of ResearchHub is available. Would you like to update now?')) {
        window.location.reload();
      }
    });

    // detect when update has been activated
    this.swu.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}

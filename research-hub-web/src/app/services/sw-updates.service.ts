import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdatesService {

  constructor(
    private updates: SwUpdate
  ) { }

  enable() {
    // if the service worker isn't active
    if (!this.updates.isEnabled) return;

    console.log('SW updates service enabled. ' + this.updates.isEnabled);

    // TODO: check for updates, activate updates, console.log version change
    // note that swupdate methods used in docs examples have been deprecated. documentation is not up to date. 
  }
}

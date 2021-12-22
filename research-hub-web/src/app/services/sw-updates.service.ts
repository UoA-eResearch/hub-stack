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
    if (!this.updates.isEnabled) return;

    console.log('SW updates service enabled. ' + this.updates.isEnabled);
  }
}

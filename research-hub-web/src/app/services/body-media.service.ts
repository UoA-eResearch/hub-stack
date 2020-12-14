import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {
  public bodyMedia: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() { }

  /**
   * Set current content body assets
   * @param assets 
   */
  setBodyMedia(bodyMedia) {
    this.bodyMedia.next(bodyMedia)
  }

  getBodyMedia() {
    return this.bodyMedia;
  }
}


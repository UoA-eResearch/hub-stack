import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {
  public bodyMedia: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public bodyMediaSub: Observable<BehaviorSubject<any>>;

  constructor() { }

  /**
   * Set current content body asset ID's
   * @param assets 
   */
  setBodyMedia(bodyMedia) {
    this.bodyMedia.next(bodyMedia)
  }

  /**
   * Get current content body asset ID's
   */
  getBodyMedia() {
    return this.bodyMedia.value;
  }
}


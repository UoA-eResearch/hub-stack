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
   * Set current content body assets
   * @param assets 
   */
  setBodyMedia(bodyMedia) {
    this.bodyMedia.next(bodyMedia)
  }

  getBodyMedia() {
    return this.bodyMedia.value;
  }
}


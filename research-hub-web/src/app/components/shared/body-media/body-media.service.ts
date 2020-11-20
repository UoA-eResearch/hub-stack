import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {

  public bodyMedia: Subject<any> = new Subject<any>();

  constructor() { }

  loadEntries(data) {
    this.bodyMedia.next(data);
  }
}

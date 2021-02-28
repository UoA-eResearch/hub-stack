import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AppComponentService {

  public url: Subject<string> = new Subject<string>();
  public titleChange: BehaviorSubject<string> = new BehaviorSubject<string>('Home');


  getRouteSlug(url: string) {
    this.url.next(url.substring(1));
  }

  setTitle(title: string) {
    this.titleChange.next(title);
  }
}

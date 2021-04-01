import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AppComponentService {

  public url: Subject<string> = new Subject<string>();
  public titleChange: BehaviorSubject<string> = new BehaviorSubject<string>('Welcome to the ResearchHub');


  // Get page slug from route
  getRouteSlug(url: string) {
    this.url.next(url.substring(1));
  }

  // Set title of the current page
  setTitle(title: string) {
    this.titleChange.next(title);
  }
}

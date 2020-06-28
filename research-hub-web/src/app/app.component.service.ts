import {Injectable} from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class AppComponentService {

  public titleChange: Subject<string> = new Subject<string>();
  public customCSSClassName: Subject<string> = new Subject<string>();
  public progressBarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  private contentSidenavVisibilityChange: Subject<boolean>;
  public contentSidenavVisibility$ : Observable<boolean>;
  public isContentSidenavVisible : boolean;

  public contentSidenavHasContent : boolean;

  constructor() {
    this.contentSidenavVisibilityChange = new Subject<boolean>();
    this.customCSSClassName = new BehaviorSubject<string>(null);
    this.contentSidenavVisibility$ = this.contentSidenavVisibilityChange.asObservable();
    this.isContentSidenavVisible = false;
  }

  setTitle(title: string) {
    this.titleChange.next(title);
  }

  setCustomCSSClassName(customCSSClassName: string) {
    this.customCSSClassName.next(customCSSClassName);
  }

  getCustomCSSClassName(customCSSClassName: string) {
   return this.customCSSClassName;
  }

  setProgressBarVisibility(isVisible: boolean) {
    this.progressBarVisibilityChange.next(isVisible);
  }

  setContentSidenavVisibility(isVisible: boolean){
    // Need to use setTimeout, as this may be called by a child component.
    // setTimeout means the changes won't be made in the same VM turn.
    // See https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    if (!this.contentSidenavHasContent && isVisible) {
      // Do not allow an empty content sidenav to show.
      return;
    }
    setTimeout(() => {
      this.contentSidenavVisibilityChange.next(isVisible);
      this.isContentSidenavVisible = isVisible;
    });
  }

  setContentSidenavHasContent(hasContent: boolean){
    this.contentSidenavHasContent = hasContent;
    if (!hasContent && this.isContentSidenavVisible){
      this.setContentSidenavVisibility(false);
    }
  }
}

import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class ConfirmDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() {
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

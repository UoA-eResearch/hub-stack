import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwUpdate } from '@angular/service-worker';
import { MockProvider } from 'ng-mocks';

import { SwUpdatesService } from './sw-updates.service';

describe('SwUpdatesService', () => {
  let service: SwUpdatesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        MockProvider(SwUpdate),
      ]
    });
    service = TestBed.inject(SwUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar and call activateUpdate after snackbar is dismissed', async () => {
    const message = 'Testing';
    const action = '123';

    const activateUpdateSpy = spyOn(service, 'activateUpdate');

    service.openSnackBar(message, action);
    expect(service.snackBarRef.instance.data.message).toBe(message);
    expect(service.snackBarRef.instance.data.action).toBe(action);

    
    service.snackBarRef.afterDismissed().subscribe(() => {
      expect(activateUpdateSpy).toHaveBeenCalled();
    });

    service.snackBarRef.dismissWithAction();
  });
});

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PageTitleService } from './services/page-title.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { AppLayoutModule } from './components/layout/layout.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { ServiceWorkerModule, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let subscribeToRouterEventsSpy: jasmine.Spy;
  let enableServiceWorkerSpy: jasmine.Spy;

  const updateEvent: VersionReadyEvent = {
    currentVersion: {
      hash: 'abc'
    },
    latestVersion: {
      hash: 'def'
    },
    type: 'VERSION_READY'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(AppLayoutModule),
        MatSnackBarModule,
        MockModule(BrowserAnimationsModule),
        ServiceWorkerModule.register('', { enabled: false })
      ],
      providers: [
        MockProvider(PageTitleService),
        MockProvider(SwUpdate, {
          versionUpdates: of(updateEvent),
          activateUpdate: () => Promise.resolve(true),
          isEnabled: true,
          checkForUpdate: () => Promise.resolve(true),
          unrecoverable: EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    subscribeToRouterEventsSpy = spyOn(component, 'subscribeToRouterEvents').and.callThrough();
    enableServiceWorkerSpy = spyOn(component, 'enableServiceWorker').and.callThrough();

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should subscribe to router events', () => {
    expect(subscribeToRouterEventsSpy).toHaveBeenCalled();
  });

  it('Should try to enable service worker', () => {
    expect(enableServiceWorkerSpy).toHaveBeenCalled();
  });

  it('should show snackbar when update is detected', async () => {
    let snackBars =  await loader.getAllHarnesses(MatSnackBarHarness);
    expect(snackBars.length).toBe(1);
    expect(await snackBars[0].getMessage()).toBe('There is a new version of the ResearchHub available!');
    expect(await snackBars[0].hasAction()).toBeTrue();
    expect(await snackBars[0].getActionDescription()).toBe('Update');

    await snackBars[0].dismissWithAction();
    expect(await snackBars[0].isDismissed()).toBeTrue();
  })
});


import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

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
        MockProvider(SwUpdate)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for snack-bar', async () => {
    fixture.componentInstance.openSnackBar('Testing', '123');
    let snackBars = await loader.getAllHarnesses(MatSnackBarHarness);
    expect(snackBars.length).toBe(1);
  });

  it('should be able to get message of snack-bar', async () => {
    fixture.componentInstance.openSnackBar('Testing', '123');
    let snackBar = await loader.getHarness(MatSnackBarHarness);
    expect(await snackBar.getMessage()).toBe('Testing');
  });

  it('should be able to get action description of snack-bar', async () => {
    fixture.componentInstance.openSnackBar('Testing', '123');
    let snackBar = await loader.getHarness(MatSnackBarHarness);
    expect(await snackBar.getActionDescription()).toBe('123');
  });

  it('should be able to check whether simple snack-bar has action', async () => {
    fixture.componentInstance.openSnackBar('Testing', '123');
    let snackBar = await loader.getHarness(MatSnackBarHarness);
    expect(await snackBar.hasAction()).toBe(true);
  });

  it('Should subscribe to router events', () => {
    const subscribeToRouterEventsSpy = spyOn(component, 'subscribeToRouterEvents');
    component.ngOnInit();
    expect(subscribeToRouterEventsSpy).toHaveBeenCalled();
  });

  it('Should try to enable service worker', () => {
    const enableServiceWorkerSpy = spyOn(component, 'enableServiceWorker');
    component.ngOnInit();
    expect(enableServiceWorkerSpy).toHaveBeenCalled();
  });
});

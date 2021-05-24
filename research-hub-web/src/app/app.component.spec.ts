import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { LoginService } from '@uoa/auth';
import { Apollo } from 'apollo-angular';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppComponent } from './app.component';
import { AppComponentService } from './app.component.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu'
import { MockModule, MockProvider } from 'ng-mocks';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(MatMenuModule)
      ],
      providers: [
          Location,
          MockProvider(SearchBarService),
          MockProvider(AppComponentService),
          Title,
          MockProvider(LoginService),
          Apollo,
          MockProvider(DeviceDetectorService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { MatMenuModule } from '@angular/material/menu';
import { cleanStylesFromDOM } from './../test-helpers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
          HttpClientTestingModule,
          ApolloTestingModule,
          RouterTestingModule.withRoutes([]),
          MatMenuModule
        ],
      providers: [
          Location,
          SearchBarService,
          AppComponentService,
          Title,
          LoginService,
          Apollo,
          DeviceDetectorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    cleanStylesFromDOM();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

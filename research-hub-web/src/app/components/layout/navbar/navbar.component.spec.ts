import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { AppLayoutModule } from '../layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@app/app.material.module';
import { LoginService } from '@uoa/auth';
import { NavbarComponent } from './navbar.component';
import { EMPTY } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeAll(MockInstance.remember);
  afterAll(MockInstance.restore);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        MockComponent(SearchBarComponent)
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(AppLayoutModule),
        MockModule(MaterialModule)
      ],
      providers: [
        MockProvider(LoginService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    MockInstance(LoginService, (instance) => {
      instance.isAuthenticated = jasmine.createSpy().and.returnValue(Promise.resolve(false));
      instance.loggedIn$ = EMPTY;
      instance.userInfo$ = EMPTY;
    })
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

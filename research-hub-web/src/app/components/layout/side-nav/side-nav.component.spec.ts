import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@app/app.material.module';
import { LoginService } from '@uoa/auth';
import { EMPTY } from 'rxjs';
import { NotificationComponent } from '../notification/notification.component';
import { FooterComponent } from '../footer/footer.component';
import { SideNavComponent } from './side-nav.component';


describe('MobileSideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SideNavComponent,
        MockComponent(NotificationComponent),
        MockComponent(FooterComponent)
      ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(MaterialModule),
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
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

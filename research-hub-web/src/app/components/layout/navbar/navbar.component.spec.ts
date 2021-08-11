import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { AppLayoutModule } from '../layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { MaterialModule } from '@app/app.material.module';
import { LoginService } from '@uoa/auth';
import { HomeScrollService } from '@services/home-scroll.service';
import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(AppLayoutModule),
        MockModule(MaterialModule),
      ],
      providers: [ 
        MockProvider(SearchBarService),
        MockProvider(LoginService),
        MockProvider(HomeScrollService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

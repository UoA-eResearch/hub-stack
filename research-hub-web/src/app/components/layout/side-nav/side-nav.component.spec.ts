import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@app/app.material.module';
import { LoginService } from '@uoa/auth';
import { SideNavComponent } from './side-nav.component';

describe('MobileSideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(MaterialModule),
      ],
      providers: [
        MockProvider(SearchBarService),
        MockProvider(LoginService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

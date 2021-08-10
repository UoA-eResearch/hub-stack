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
import { Category, Stage } from '@app/graphql/schema';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockAllCategories = [
    {
      "name": "Research Software & Computing",
      "description": "Access software, networking, data storage, high performance computing, virtual machines, and cloud resources for your research.",
      "displayOrder": 1,
      "sys": {
        "id": "1Et8APbD7dWF1TrLzQDzMf",
        "__typename": "Sys"
      },
      "__typename": "Category"
    },
    {
      "name": "Research Data Management",
      "description": "Learn how to manage research data, write a management plan, and make your data re-usable and available to other researchers.",
      "displayOrder": 2,
      "sys": {
        "id": "9Cj91WZbVSica6iA8bY7R",
        "__typename": "Sys"
      },
      "__typename": "Category"
    }
  ] as Category[];

  const mockAllStages = [
    {
      "name": "Plan & Design",
      "description": "Resources to support the planning and design process of your research",
      "image": {
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/6wHMFGGqHcl9ZuykN8SWG4/cbfe82400850fc63769e2ecaf7fb2db7/Plan___Design.jpg",
        "__typename": "Asset"
      },
      "displayOrder": 1,
      "sys": {
        "id": "dlT81YGrXkfDaCXHpuzBN",
        "__typename": "Sys"
      },
      "__typename": "Stage"
    }
  ] as Stage[];

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
    component.allCategories = mockAllCategories;
    component.allStages = mockAllStages;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

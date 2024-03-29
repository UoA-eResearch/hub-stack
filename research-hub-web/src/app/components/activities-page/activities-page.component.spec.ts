import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesPageComponent } from './activities-page.component';
import { SearchService } from '@services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Stage } from '@graphql/schema';
import { Observable, of } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { PageTitleService } from '@services/page-title.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActivitiesPageComponent', () => {
  let component: ActivitiesPageComponent;
  let fixture: ComponentFixture<ActivitiesPageComponent>;
  const mockStages$: Observable<Stage[]> = of(
    [
      {
        "name": "Discover & Reuse",
        "description": "Discover other research publications and reuse them for your research project",
        "displayOrder": 5
      },
      {
        "name": "Analyze & Interpret",
        "description": "Learn how to create and collect your research data effectively",
        "displayOrder": 3
      },
      {
        "name": "Publish & Report",
        "description": "Publishing and reporting the findings of your research",
        "displayOrder": 4
      },
      {
        "name": "Create, Collect & Capture",
        "description": "Learn how to create and collect your research data effectively",
        "displayOrder": 2
      },
      {
        "name": "Plan & Design",
        "description": "Resources to support the planning and design process of your research",
        "displayOrder": 1
      }
    ] as Stage[]
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ActivitiesPageComponent
      ],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(SearchService),
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all stages', () => {
    spyOn(component, 'getAllStages').and.returnValue(mockStages$);
    component.getAllStages().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })
});

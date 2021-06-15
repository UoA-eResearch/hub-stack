import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchActivityComponent } from './research-activity.component';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { StageCollection, AllStagesGQL } from '@graphql/schema';
import { Observable, of } from 'rxjs';
import { MockProvider } from 'ng-mocks';

describe('ResearchActivityComponent', () => {
  let component: ResearchActivityComponent;
  let fixture: ComponentFixture<ResearchActivityComponent>;
  const mockStages$: Observable<StageCollection> = of({
    'items': [
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
    ]
  } as StageCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchActivityComponent ],
      imports: [ HttpClientTestingModule, ApolloTestingModule ],
      providers: [ MockProvider(SearchBarService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchActivityComponent);
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseComponent } from './browse.component';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { CategoryCollection, AllCategoriesGQL } from '@graphql/schema';
import { Observable, of } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ContentTitleComponent } from '../content-title/content-title.component';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;
  const mockCategories$: Observable<CategoryCollection> = of({
    'items': [
      {
        "name": "Researcher Skills & Development",
        "description": "Explore the continuous learning available to you and find opportunities to develop your research skills.",
        "displayOrder": 4
      },
      {
        "name": "Collections & Data Repositories",
        "description": "Discover the data stores and special collections available to researchers at the University of Auckland.",
        "displayOrder": 8
      },
      {
        "name": "Research Outputs & Publishing",
        "description": "Make the outputs of your research available to the world. Publish your data and your research. Print your posters, drawings and art.",
        "displayOrder": 7
      },
      {
        "name": "Research Strategy & Governance",
        "description": "\nDiscover the University of Auckland's Research Strategy and the policies and processes that support research at the University.\n",
        "displayOrder": 27
      },
      {
        "name": "Research Impact & Engagement",
        "description": "Engage with communities, iwi, funders and industry to benefit society, the environment, the economy, whānau and communities.",
        "displayOrder": 5
      },
      {
        "name": "Researcher Profiles & Metrics",
        "description": "Build your profile as a researcher. Record and share links to your research outputs and track the impact of your research.",
        "displayOrder": 6
      },
      {
        "name": "Vision Mātauranga",
        "description": "Deliver on Vision Mātauranga in your research at the University of Auckland and learn more about engaging Māori in your research.",
        "displayOrder": 3
      },
      {
        "name": "Research Data Management",
        "description": "Learn how to manage research data, write a management plan, and make your data re-usable and available to other researchers.",
        "displayOrder": 2
      },
      {
        "name": "Research Software & Computing",
        "description": "Access software, networking, data storage, high performance computing, virtual machines, and cloud resources for your research.",
        "displayOrder": 1
      },
      {
        "name": "Managing Your Research Project",
        "description": "Manage your funding, contracts, and research projects with support from our friendly professional staff.",
        "displayOrder": 26
      },
      {
        "name": "Ethics, Integrity, & Compliance",
        "description": "Discover the policies, processes, software, and support for managing ethics, integrity, and compliance.",
        "displayOrder": 24
      },
      {
        "name": "Sourcing & Managing Funding",
        "description": "Source funding for your research and get funding application support from our friendly professional staff.",
        "displayOrder": 23
      },
      {
        "name": "Facilities & Equipment",
        "description": "Explore the facilities and equipment available to University of Auckland researchers.",
        "displayOrder": 10
      },
      {
        "name": "Research Centers & Support Services",
        "description": "Find support for your research and explore research centres at the University of Auckland. ",
        "displayOrder": 9
      },
      {
        "name": "Intellectual Property & Commercialisation",
        "description": "Discover policy, process, and advice for managing intellectual property in your research and commercialising your research.",
        "displayOrder": 14
      },
      {
        "name": "Events",
        "description": "See all upcoming events at the ResearchHub.",
        "displayOrder": 16
      }
    ]
  } as CategoryCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BrowseComponent,
        MockComponent(ContentContainerComponent),
        MockComponent(ContentTitleComponent)
      ],
      imports: [ HttpClientTestingModule, ApolloTestingModule ],
      providers: [ MockProvider(SearchBarService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all categories', () => {
    spyOn(component, 'getAllCategories').and.returnValue(mockCategories$);
    component.getAllCategories().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { HumanCasePipe } from '../../../pipes/human-case.pipe';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let pipe: HumanCasePipe;
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardsComponent,
        MockPipe(HumanCasePipe)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    component._contentItem = { "items": [ { "__typename": "Software", "icon": null, "slug": "research-outputs", "title": "Research Outputs", "summary": "Research Outputs is the research management system used by University staff and doctoral candidates to record their research publications and activities.", "ssoProtected": false, "searchable": true }, { "__typename": "Service", "icon": null, "slug": "researchspace", "title": "ResearchSpace", "summary": "The University of Auckland Research Repository is an online archive for the University of Auckland. It contains the research outputs of University of Auckland staff and postgraduate research students, including full text theses.", "ssoProtected": false, "searchable": true }, { "__typename": "Service", "icon": null, "slug": "data-publishing-and-discovery", "title": "Data Publishing and Discovery Service", "summary": "A online digital repository and publishing service where researchers can preserve and share their research data and digital creative works, including figures, datasets, images, and videos.", "ssoProtected": false, "searchable": true }, { "__typename": "SubHub", "icon": null, "slug": "research-impact", "title": "Research Impact", "summary": "These pages contain tools and resources to support you in generating impact from your research.", "ssoProtected": false, "searchable": true, "banner": { "url": "https://images.ctfassets.net/vbuxn5csp0ik/43XrwAi4yAyhMb0fYKyzis/d2dda7ec1fe09f24eb0ab52d6af6789d/terry-vlisidis-SFEvfN01-ao-unsplash.jpg", "__typename": "Asset" } } ], "__typename": "ArticleRelatedItemsCollection" };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

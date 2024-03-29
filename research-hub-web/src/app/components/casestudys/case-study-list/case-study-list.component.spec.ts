import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { CaseStudyListComponent } from './case-study-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { CaseStudyCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('CaseStudyListComponent', () => {
  let component: CaseStudyListComponent;
  let fixture: ComponentFixture<CaseStudyListComponent>;
  let controller: ApolloTestingController;

  const mockAllCaseStudy$: Observable<CaseStudyCollection> = of({
    'items': [
      {
        '__typename': 'CaseStudy',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'CaseStudyCollection'
  } as CaseStudyCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CaseStudyListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(CaseStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all case studies', () => {
    spyOn(component, 'loadContent').and.returnValue(mockAllCaseStudy$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(1);
      });
    })
  });
});

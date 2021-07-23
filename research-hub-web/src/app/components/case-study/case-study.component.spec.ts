import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CaseStudyComponent } from './case-study.component';
import { PageTitleService } from '@services/page-title.service';
import { CaseStudy, CaseStudyCollection } from '@app/graphql/schema';

describe('CaseStudyComponent', () => {
  let component: CaseStudyComponent;
  let appComponentService: PageTitleService;
  let fixture: ComponentFixture<CaseStudyComponent>;
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

  const mockCaseStudy$: Observable<CaseStudy> = of(
    {
      '__typename': 'CaseStudy',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as CaseStudy);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyComponent ],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([])
      ], providers: [
        MockProvider(PageTitleService)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(CaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all case studies', () => {
    spyOn(component, 'getAllCaseStudy').and.returnValue(mockAllCaseStudy$);
    component.getAllCaseStudy().subscribe(res => {
      expect(res).toBeTruthy();
    });
  });

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(CaseStudyComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'death-star'
      });
      fixture.detectChanges();
    });

    it('Should get a single case study data', () => {
      spyOn(component, 'getCaseStudyBySlug').and.returnValue(mockCaseStudy$);
      component.getCaseStudyBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    });
  });

});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CaseStudyComponent } from './case-study.component';
import { PageTitleService } from '@services/page-title.service';
import { CaseStudy } from '@app/graphql/schema';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { CaseStudyListComponent } from '../case-study-list/case-study-list.component';

describe('CaseStudyComponent', () => {
  let component: CaseStudyComponent;
  let fixture: ComponentFixture<CaseStudyComponent>;
  let controller: ApolloTestingController;

  const mockCaseStudy$: Observable<CaseStudy> = of(
    {
      '__typename': 'CaseStudy',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': false,
      'searchable': false
    } as unknown as CaseStudy);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseStudyComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([
          { path: 'casestudy/list', component: CaseStudyListComponent }
        ])
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

  describe('When a url slug is present', async () => {
    const testSlug: string = 'death-star';

    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(CaseStudyComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: testSlug
      });
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('Should get a single case study data', () => {
      spyOn(component, 'getCaseStudyBySlug').and.returnValue(mockCaseStudy$);
      
      fixture.whenStable().then(() => {        
        component.getCaseStudyBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    });
  });
});

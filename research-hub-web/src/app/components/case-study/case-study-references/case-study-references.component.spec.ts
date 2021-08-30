import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { CaseStudyReferencesComponent } from './case-study-references.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CaseStudy } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';

describe('CaseStudyReferencesComponent', () => {
  let component: CaseStudyReferencesComponent;
  let fixture: ComponentFixture<CaseStudyReferencesComponent>;
  let controller: ApolloTestingController;

  const mockCaseStudy$: Observable<CaseStudy> = of(
    {
      '__typename': 'CaseStudy',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'ssoProtected': true,
      'references': {
        'json': {}
      }
    } as CaseStudy);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseStudyReferencesComponent
      ],
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule)
      ], providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(CaseStudyReferencesComponent);
    component = fixture.componentInstance;
    TestBed.inject(ActivatedRoute).params = of({
      slug: 'death-star'
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a url slug is present', async () => {
    it('Should get a single CaseStudy data by Slug', () => {
      spyOn(component, 'getCaseStudyReferencesBySlug').and.returnValue(mockCaseStudy$);
      component.getCaseStudyReferencesBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })
  });
});

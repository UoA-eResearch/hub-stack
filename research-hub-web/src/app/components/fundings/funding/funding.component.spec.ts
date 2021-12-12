import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { FundingComponent } from './funding.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funding } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { FundingListComponent } from '../funding-list/funding-list.component';

describe('FundingsComponent', () => {
  let component: FundingComponent;
  let fixture: ComponentFixture<FundingComponent>;
  let controller: ApolloTestingController;

  const mockFunding$: Observable<Funding> = of(
    {
      '__typename': 'Funding',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Funding);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FundingComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'funding/list', component: FundingListComponent }
        ]),
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
    fixture = TestBed.createComponent(FundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a url slug is present', async () => {
    const testSlug: string = 'death-star';

    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(FundingComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: testSlug
      });
      fixture.detectChanges();
      component.ngOnInit();
    })

    it('Should get a single Funding data by Slug', () => {
      spyOn(component, 'getFundingBySlug').and.returnValue(mockFunding$);

      fixture.whenStable().then(() => {
        component.getFundingBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    })
  });
});

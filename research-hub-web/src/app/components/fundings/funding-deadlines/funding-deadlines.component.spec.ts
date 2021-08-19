import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { FundingDeadlinesComponent } from './funding-deadlines.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funding } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';

describe('FundingDeadlinesComponent', () => {
  let component: FundingDeadlinesComponent;
  let fixture: ComponentFixture<FundingDeadlinesComponent>;
  let controller: ApolloTestingController;

  const mockFunding$: Observable<Funding> = of(
    {
      '__typename': 'Funding',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'ssoProtected': true,
      'deadlines': {
        'json': {}
      }
    } as Funding);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FundingDeadlinesComponent
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
    fixture = TestBed.createComponent(FundingDeadlinesComponent);
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
    it('Should get a single Funding data by Slug', () => {
      spyOn(component, 'getFundingDeadlinesBySlug').and.returnValue(mockFunding$);
      component.getFundingDeadlinesBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })
  });
});

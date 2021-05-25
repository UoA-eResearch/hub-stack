import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponentService } from '@app/app.component.service';
import { FundingPurposeComponent } from './funding-purpose.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funding } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('FundingPurposeComponent', () => {
  let component: FundingPurposeComponent;
  let fixture: ComponentFixture<FundingPurposeComponent>;
  let controller: ApolloTestingController;

  const mockFunding$: Observable<Funding> = of(
    {
      '__typename': 'Funding',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'ssoProtected': true,
      'purpose': {
        'json': {}
      }
    } as Funding);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FundingPurposeComponent
      ],
      imports: [
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AppComponentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(FundingPurposeComponent);
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
      spyOn(component, 'getFundingPurposeBySlug').and.returnValue(mockFunding$);
      component.getFundingPurposeBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })
  });
});

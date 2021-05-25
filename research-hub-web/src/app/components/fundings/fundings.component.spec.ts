import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponentService } from '@app/app.component.service';
import { FundingsComponent } from './fundings.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FundingCollection, AllFundingGQL, Funding } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('FundingsComponent', () => {
  let component: FundingsComponent;
  let fixture: ComponentFixture<FundingsComponent>;
  let controller: ApolloTestingController;

  const mockAllFunding$: Observable<FundingCollection> = of({
    'items': [
      {
        '__typename': 'Funding',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'FundingCollection'
  } as FundingCollection);

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
        FundingsComponent
      ],
      imports: [
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AppComponentService,
        AllFundingGQL
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(FundingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all fundings', () => {
    spyOn(component, 'getAllFundings').and.returnValue(mockAllFunding$);
    component.getAllFundings().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(FundingsComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'death-star'
      });
      fixture.detectChanges();
    })

    it('Should get a single Funding data by Slug', () => {
      spyOn(component, 'getFundingBySlug').and.returnValue(mockFunding$);
      component.getFundingBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })
  });
});
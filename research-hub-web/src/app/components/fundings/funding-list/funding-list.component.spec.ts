import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { FundingListComponent } from './funding-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { FundingCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('FundingListComponent', () => {
  let component: FundingListComponent;
  let fixture: ComponentFixture<FundingListComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FundingListComponent,
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
    fixture = TestBed.createComponent(FundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get all fundings', () => {
  //   spyOn(component, 'getAllFundings').and.returnValue(mockAllFunding$);
  //   component.getAllFundings().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })
});

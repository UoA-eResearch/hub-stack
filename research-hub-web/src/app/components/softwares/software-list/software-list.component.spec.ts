import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SoftwareListComponent } from './software-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { SoftwareCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('SoftwareListComponent', () => {
  let component: SoftwareListComponent;
  let fixture: ComponentFixture<SoftwareListComponent>;
  let controller: ApolloTestingController;

  const mockAllSoftware$: Observable<SoftwareCollection> = of({
    'items': [
      {
        '__typename': 'Software',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'SoftwareCollection'
  } as SoftwareCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SoftwareListComponent,
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
    fixture = TestBed.createComponent(SoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all Software', () => {
    spyOn(component, 'loadContent').and.returnValue(mockAllSoftware$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(1);
      });
    })
  })
});

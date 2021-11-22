import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ServiceListComponent } from './service-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { ServiceCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;
  let controller: ApolloTestingController;

  const mockAllServices$: Observable<ServiceCollection> = of({
    'items': [
      {
        '__typename': 'Service',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'ServiceCollection'
  } as ServiceCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ServiceListComponent,
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
    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all Service', () => {
  //   spyOn(component, 'getAllServices').and.returnValue(mockAllServices$);
  //   component.getAllServices().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })
});

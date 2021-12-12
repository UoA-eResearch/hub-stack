import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { EquipmentListComponent } from './equipment-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { EquipmentCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;
  let controller: ApolloTestingController;

  const mockAllEquipment$: Observable<EquipmentCollection> = of({
    'items': [
      {
        '__typename': 'Equipment',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'EquipmentCollection'
  } as EquipmentCollection);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EquipmentListComponent,
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
    fixture = TestBed.createComponent(EquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should get all equipment', () => {
    spyOn(component, 'loadContent').and.returnValue(mockAllEquipment$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(1);
      });
    })
  })
});

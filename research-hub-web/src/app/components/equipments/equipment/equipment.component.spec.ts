import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { EquipmentComponent } from './equipment.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EquipmentCollection, AllEquipmentGQL, Equipment } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
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

  const mockEquipment$: Observable<Equipment> = of(
    {
      '__typename': 'Equipment',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Equipment);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        EquipmentComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all equipment', () => {
  //   spyOn(component, 'getAllEquipment').and.returnValue(mockAllEquipment$);
  //   component.getAllEquipment().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })

  // describe('When a url slug is present', async () => {
  //   beforeEach(() => {
  //     controller = TestBed.inject(ApolloTestingController);
  //     fixture = TestBed.createComponent(EquipmentComponent);
  //     component = fixture.componentInstance;
  //     TestBed.inject(ActivatedRoute).params = of({
  //       slug: 'death-star'
  //     });
  //     fixture.detectChanges();
  //   })

  //   it('Should get a single equipment data by Slug', () => {
  //     spyOn(component, 'getEquipmentBySlug').and.returnValue(mockEquipment$);
  //     component.getEquipmentBySlug(component.slug).subscribe(res => {
  //       expect(res.slug).toEqual('death-star');
  //     });
  //   })
  // });
});

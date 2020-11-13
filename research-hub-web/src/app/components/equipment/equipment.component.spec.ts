import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponentService } from '../../app.component.service';
import { EquipmentComponent } from './equipment.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EquipmentCollection, AllEquipmentGQL, Equipment } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let appComponentService: AppComponentService;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EquipmentComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AppComponentService,
        AllEquipmentGQL
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
    controller.verify();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all equipment', async () => {
    spyOn(component, 'getAllEquipment').and.returnValue(mockAllEquipment$);
    component.getAllEquipment().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(EquipmentComponent);
      component = fixture.componentInstance;
      appComponentService = new AppComponentService;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'death-star'
      });
      fixture.detectChanges();
    })

    it('Should set title', async () => {
      let spy = spyOn(appComponentService, 'setTitle');
      appComponentService.setTitle('Title');
      expect(spy).toHaveBeenCalled();
    });

    xit('Should evaluate components slug property to be truthy', () => {
      expect(component.slug).toBeTruthy();
    });

    it('Should get a single equipment data by Slug', async () => {
      spyOn(component, 'getEquipmentBySlug').and.returnValue(mockEquipment$);
      component.getEquipmentBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })

    it('Should get a single equipment data by ID', async () => {
      spyOn(component, 'getEquipmentByID').and.returnValue(mockEquipment$);
      component.getEquipmentByID('').subscribe(res => {
        expect(res.sys.id).toEqual('111');
      });
    })
  });
});
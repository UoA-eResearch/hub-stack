import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponentService } from '@app/app.component.service';
import { EquipmentComponent } from './equipment.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EquipmentCollection, AllEquipmentGQL, Equipment } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '@uoa/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cleanStylesFromDOM } from './../../../test-helpers';

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
        EquipmentComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AppComponentService,
        LoginService,
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
  });

  afterAll(() => {
    cleanStylesFromDOM();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all equipment', () => {
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
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'death-star'
      });
      fixture.detectChanges();
    })

    afterEach(() => {
      fixture.destroy();
    });

    afterAll(() => {
      cleanStylesFromDOM();
    });

    it('Should get a single equipment data by Slug', () => {
      spyOn(component, 'getEquipmentBySlug').and.returnValue(mockEquipment$);
      component.getEquipmentBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })
  });
});
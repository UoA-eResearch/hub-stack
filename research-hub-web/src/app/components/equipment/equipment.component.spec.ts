import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentComponent } from './equipment.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { EquipmentCollection, AllEquipmentGQL, AllEquipmentDocument } from '../../graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

xdescribe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
  let backend: ApolloTestingController;
  let controller: ApolloTestingController;
  let spy: any;

  const mockAllEquipment$: Observable<EquipmentCollection> = of ({
    "items": [
      {
        "__typename": "Equipment",
        "slug": "death-star",
        "title": "Death Star",
        "summary": "Mobile space station and galactic superweapon.",
        "ssoProtected": true,
        "searchable": false
      }
    ],
    "__typename": "EquipmentCollection"
  } as EquipmentCollection);

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
        AllEquipmentGQL
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.get(ApolloTestingController);
    spy = spyOn(EquipmentComponent.prototype, 'getAllEquipment').and.returnValue(mockAllEquipment$);

    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

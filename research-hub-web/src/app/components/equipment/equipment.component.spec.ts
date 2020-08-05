import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentComponent } from './equipment.component';
import { SharedModule } from '../shared/app.shared.module';
import { EquipmentModule } from './equipment.module';
import { CommonModule } from '@angular/common';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { By } from '@angular/platform-browser';

xdescribe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EquipmentComponent
      ],
      imports: [
        ApolloTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Results as title', async () => {
    const de = fixture.debugElement.query(By.css('#title'));
    expect(de.nativeElement.innerHTML).toEqual('Results');
  });

});

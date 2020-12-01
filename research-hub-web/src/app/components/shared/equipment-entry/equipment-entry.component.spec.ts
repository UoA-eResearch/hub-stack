import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentEntryComponent } from './equipment-entry.component';

describe('EquipmentEntryComponent', () => {
  let component: EquipmentEntryComponent;
  let fixture: ComponentFixture<EquipmentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericContactComponent } from './generic-contact.component';

describe('GenericContactComponent', () => {
  let component: GenericContactComponent;
  let fixture: ComponentFixture<GenericContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

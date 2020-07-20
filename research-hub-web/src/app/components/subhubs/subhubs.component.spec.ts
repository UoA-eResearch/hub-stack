import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhubsComponent } from './subhubs.component';

describe('SubhubsComponent', () => {
  let component: SubhubsComponent;
  let fixture: ComponentFixture<SubhubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubhubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubhubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

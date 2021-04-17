import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyRoutingComponent } from './legacy-routing.component';

describe('LegacyRoutingComponent', () => {
  let component: LegacyRoutingComponent;
  let fixture: ComponentFixture<LegacyRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyRoutingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

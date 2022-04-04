import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLegendComponent } from './color-legend.component';

describe('ColorLegendComponent', () => {
  let component: ColorLegendComponent;
  let fixture: ComponentFixture<ColorLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

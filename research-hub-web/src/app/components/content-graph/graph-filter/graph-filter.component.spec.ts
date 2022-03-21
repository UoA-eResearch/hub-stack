import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphFilterComponent } from './graph-filter.component';

describe('GraphLegendComponent', () => {
  let component: GraphFilterComponent;
  let fixture: ComponentFixture<GraphFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

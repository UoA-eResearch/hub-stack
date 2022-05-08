import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import { ColorLegendComponent } from '../color-legend/color-legend.component';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { GraphFilterComponent } from '../graph-filter/graph-filter.component';

import { GraphLayoutComponent } from './graph-layout.component';

describe('GraphLayoutComponent', () => {
  let component: GraphLayoutComponent;
  let fixture: ComponentFixture<GraphLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GraphLayoutComponent,
        MockComponent(ColorLegendComponent),
        MockComponent(GraphFilterComponent),
        MockComponent(GraphContainerComponent)
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MockModule(MatSidenavModule),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentGraphService } from '@services/content-graph.service';
import { MockModule, MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';

import { GraphContainerComponent } from './graph-container.component';

describe('GraphContainerComponent', () => {
  let component: GraphContainerComponent;
  let fixture: ComponentFixture<GraphContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphContainerComponent],
      providers: [MockProvider(ContentGraphService, { getGraph: () => EMPTY })],
      imports: [MockModule(MatProgressBarModule)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

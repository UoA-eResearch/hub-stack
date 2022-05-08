import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { MockModule, MockPipe } from 'ng-mocks';

import { NodeDetailsComponent } from './node-details.component';

describe('NodeDetailsComponent', () => {
  let component: NodeDetailsComponent;
  let fixture: ComponentFixture<NodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NodeDetailsComponent,
        MockPipe(ContentTypeDisplayNamePipe)
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MockModule(MatExpansionModule),
        MockModule(MatIconModule)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsComponent);
    component = fixture.componentInstance;
    component.colorMap = new Map([
      ['article', 'red']
    ]);
    component.node = {
      id: 'A',
      name: 'Test',
      slug: 'abc-def',
      type: 'article'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

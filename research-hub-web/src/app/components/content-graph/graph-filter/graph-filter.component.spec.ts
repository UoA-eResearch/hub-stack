import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';

import { GraphFilterComponent } from './graph-filter.component';

describe('GraphFilterComponent', () => {
  let component: GraphFilterComponent;
  let fixture: ComponentFixture<GraphFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphFilterComponent],
      imports: [
        MockModule(MatAutocompleteModule),
        MockModule(FormsModule),
        MockModule(ReactiveFormsModule),
        MockModule(MatFormFieldModule),
        MockModule(MatIconModule)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphFilterComponent);
    component = fixture.componentInstance;
    component.nodes = [
      {
        id: 'A',
        name: 'Test',
        slug: 'abc',
        type: 'article'
      }
    ]
    component.selectedNode = {
      id: 'A',
      name: 'Test',
      slug: 'abc',
      type: 'article'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

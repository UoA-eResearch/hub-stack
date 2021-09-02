import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockModule } from 'ng-mocks';

import { SearchFiltersComponent } from './search-filters.component';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFiltersComponent ],
      imports: [
        ApolloTestingModule,
        MockModule(MaterialModule)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

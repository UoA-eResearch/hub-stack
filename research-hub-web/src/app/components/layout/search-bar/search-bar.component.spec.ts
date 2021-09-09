import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { SearchService } from '@services/search.service';
import { MockModule, MockProvider  } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MockModule(MaterialModule),
        MockModule(FormsModule)
      ],
      declarations: [
        SearchBarComponent,
        SearchFiltersComponent
      ],
      providers: [
        MockProvider(SearchService),
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

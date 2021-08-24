import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider, MockModule } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { SharedModule } from '../../shared/app.shared.module';
import { SearchResultsListComponent } from './search-results-list.component';

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsListComponent ],
      imports: [
        HttpClientTestingModule,
        MockModule(SharedModule)
      ],
      providers: [
        MockProvider(SearchBarService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

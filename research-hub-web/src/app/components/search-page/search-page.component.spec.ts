import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SearchPageComponent } from './search-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/app.shared.module';
import { PageTitleService } from '@services/page-title.service';
import { SearchComponent } from './search/search.component';
import { IntranetSearchComponent } from './intranet-search/intranet-search.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        MockComponent(SearchComponent),
        MockComponent(IntranetSearchComponent),
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule,
        MockModule(CommonModule),
        MockModule(SharedModule)
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

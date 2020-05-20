import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSidenavComponent } from './filter-sidenav.component';
import { SearchResultsModule } from '../search-results.module';
import { SearchFiltersService } from '../search-filters/search-filters.service';
import { ResearchHubApiService } from 'app/services/research-hub-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OptionsService } from 'app/services/options.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/components/shared/app.shared.module';
import { SearchResultsComponentService } from '../search-results-component.service';

describe('FilterSidenavComponent', () => {
  let fixture: ComponentFixture<FilterSidenavComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [
          CommonModule,
          SharedModule,
          SearchResultsModule,
        ],
        providers: [
          SearchResultsComponentService,
          SearchFiltersService,
          ResearchHubApiService,
          OptionsService,
          HttpClient,
          HttpHandler
        ]
    }).createComponent(FilterSidenavComponent);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

});

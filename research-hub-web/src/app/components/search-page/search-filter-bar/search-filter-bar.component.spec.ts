import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterBarComponent } from './search-filter-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('SearchFilterBarComponent', () => {
  let component: SearchFilterBarComponent;
  let fixture: ComponentFixture<SearchFilterBarComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterBarComponent],
      imports: [
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatSelectModule,
        MatChipsModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterBarComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show search text', () => {
    component.searchText = 'test query';
    fixture.detectChanges();

    const resultSpan = fixture.debugElement.query(By.css('.result-total>span'));
    expect(resultSpan.nativeElement.innerHTML).toContain(`"${component.searchText}"`);
  });

  it('should show number of search results', () => {
    component.totalResults = 5;
    fixture.detectChanges();

    const resultTotal = fixture.debugElement.query(By.css('.result-total>span>b'));
    expect(resultTotal.nativeElement.innerHTML).toContain(`${component.totalResults}`);
  });

  it('should properly pluralise "Result" text', () => {
    component.totalResults = 1;
    fixture.detectChanges();

    const oneResult = fixture.debugElement.query(By.css('.result-total>span'));
    expect(oneResult.nativeElement.innerHTML)
      .withContext('should be "Result" when there is 1 result')
      .toContain('Result ');

    component.totalResults = 3;
    fixture.detectChanges();

    const resultTotal = fixture.debugElement.query(By.css('.result-total>span'));
    expect(resultTotal.nativeElement.innerHTML)
      .withContext('should be "Results" when there is more than 1 result')
      .toContain('Results ');
  });

  it('should update sort order when selecting from drop down', async () => {
    const matSelection = await loader.getHarness(MatSelectHarness);
    await matSelection.clickOptions({ text: 'A-Z' });
    fixture.detectChanges();

    expect(component.sortOrder).toBe('A-Z');
  });

  it('should show active filters', () => {
    component.activeFilters = {category: ['abc', 'zyx'], stage: ['def'], relatedOrgs: ['ghi']};
    fixture.detectChanges();

    const filters = fixture.debugElement.queryAll(By.css('.applied-filters>span>b'));
    expect(filters[0].nativeElement.innerHTML).toBe('2');
    expect(filters[1].nativeElement.innerHTML).toBe('1');
    expect(filters[2].nativeElement.innerHTML).toBe('1');
  });
});

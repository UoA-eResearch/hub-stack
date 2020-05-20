import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { MatChip, MatChipList } from '@angular/material/chips';
import { SearchResultsComponentService } from '../search-results-component.service';
import { ResearchHubApiService } from 'app/services/research-hub-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryListComponent,
        MatChip,
        MatChipList
      ],
      providers: [
        SearchResultsComponentService,
        ResearchHubApiService,
        HttpClient,
        HttpHandler,
        ErrorStateMatcher
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

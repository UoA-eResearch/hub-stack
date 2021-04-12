import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../app.shared.module';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { cleanStylesFromDOM } from './../../../../test-helpers';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        ApolloTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        CommonModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        SearchBarService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    cleanStylesFromDOM();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("getDefaultIcon (function)", () => {

    afterEach(() => {
      fixture.destroy();
    });

    afterAll(() => {
      cleanStylesFromDOM();
    });

    it("Should return the lnguage icon name for a subhub", () => {
      expect(component.getDefaultTypeIcon('SubHub')).toEqual('language');
    });

    it("Should return the home manage accounts icon name for a service", () => {
      expect(component.getDefaultTypeIcon('Service')).toEqual('manage_accounts');
    });

    it("Should return the article icon name by default", () => {
      expect(component.getDefaultTypeIcon('')).toEqual('article');
    });

  });
});

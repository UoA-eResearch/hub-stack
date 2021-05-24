import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../app.shared.module';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';

fdescribe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        MockModule(CommonModule),
        MockModule(SharedModule),
        HttpClientTestingModule
      ],
      providers: [
        MockProvider(SearchBarService),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("getDefaultIcon (function)", () => {

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

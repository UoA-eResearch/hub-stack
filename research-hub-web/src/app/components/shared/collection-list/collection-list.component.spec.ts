import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../app.shared.module';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        ApolloTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        CommonModule,
        SharedModule,
        HttpClientModule
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

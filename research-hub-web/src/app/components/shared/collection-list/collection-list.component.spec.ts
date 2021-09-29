import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { SharedModule } from '../app.shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockModule } from 'ng-mocks';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        MockModule(SharedModule),
        HttpClientTestingModule
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

    it("Should return the language icon name for a subhub", () => {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListComponent } from './collection-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../app.shared.module';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        RouterModule.forRoot([]),
        CommonModule,
        SharedModule
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

    it("Should return the layers icon name for a subhub", () => {
      expect(component.getDefaultTypeIcon('SubHub')).toEqual('layers');
    });

    it("Should return the home repair services icon name for a service", () => {
      expect(component.getDefaultTypeIcon('Service')).toEqual('home_repair_services');
    });

    it("Should return the article icon name by default", () => {
      expect(component.getDefaultTypeIcon('')).toEqual('article');
    });

  });
});

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhubListComponent } from './subhub-list.component';

describe('SubhubListComponent', () => {
  let component: SubhubListComponent;
  let fixture: ComponentFixture<SubhubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubhubListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubhubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

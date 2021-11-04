import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandablePagePartComponent } from './expandable-page-part.component';

describe('ExpandablePagePartComponent', () => {
  let component: ExpandablePagePartComponent;
  let fixture: ComponentFixture<ExpandablePagePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandablePagePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePagePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

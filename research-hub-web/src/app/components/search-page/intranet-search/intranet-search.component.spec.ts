import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetSearchComponent } from './intranet-search.component';

describe('IntranetSearchComponent', () => {
  let component: IntranetSearchComponent;
  let fixture: ComponentFixture<IntranetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntranetSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

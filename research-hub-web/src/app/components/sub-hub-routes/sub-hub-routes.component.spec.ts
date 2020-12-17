import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHubRoutesComponent } from './sub-hub-routes.component';

describe('SubHubRoutesComponent', () => {
  let component: SubHubRoutesComponent;
  let fixture: ComponentFixture<SubHubRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHubRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHubRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

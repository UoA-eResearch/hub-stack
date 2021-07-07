import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSideNavComponent } from './mobile-side-nav.component';

describe('MobileSideNavComponent', () => {
  let component: MobileSideNavComponent;
  let fixture: ComponentFixture<MobileSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

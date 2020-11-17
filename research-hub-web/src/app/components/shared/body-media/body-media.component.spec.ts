import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMediaComponent } from './body-media.component';

describe('BodyMediaComponent', () => {
  let component: BodyMediaComponent;
  let fixture: ComponentFixture<BodyMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

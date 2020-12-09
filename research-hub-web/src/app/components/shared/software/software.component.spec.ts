import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoftwareComponent } from './software.component';

describe('SoftwareComponent', () => {
  let component: SoftwareComponent;
  let fixture: ComponentFixture<SoftwareComponent>;

  const mockSoftware = {
    "title": "Test - Open Refine",
    "summary": "OpenRefine is a standalone open source desktop application for data cleanup and transformation to other formats",
    "__typename": "Software"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareComponent);
    component = fixture.componentInstance;
    component.contentItem = mockSoftware;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

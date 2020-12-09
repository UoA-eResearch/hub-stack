import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;

  const mockService = {
    "title": "Test - Animal Ethics",
    "summary": "Information about animal welfare legislation, the need for approval by the Animal Ethics Committee (AEC) for the use of animals in research and teaching, and the application process.",
    "__typename": "Service",
    "mainImage": "https://juliuskarl.dev"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    component.contentItem = mockService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

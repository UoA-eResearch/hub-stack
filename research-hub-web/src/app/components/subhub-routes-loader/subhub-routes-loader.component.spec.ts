import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHubRoutesLoaderComponent } from './subhub-routes-loader.component';

describe('SubHubRoutesLoaderComponent', () => {
  let component: SubHubRoutesLoaderComponent;
  let fixture: ComponentFixture<SubHubRoutesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHubRoutesLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHubRoutesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

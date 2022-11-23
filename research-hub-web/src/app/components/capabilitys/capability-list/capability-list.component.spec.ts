import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { MockProvider } from 'ng-mocks';

import { CapabilityListComponent } from './capability-list.component';

describe('CapabilityListComponent', () => {
  let component: CapabilityListComponent;
  let fixture: ComponentFixture<CapabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapabilityListComponent],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

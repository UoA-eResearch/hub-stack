import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialDocumentComponent } from './official-document.component';

describe('OfficialDocumentComponent', () => {
  let component: OfficialDocumentComponent;
  let fixture: ComponentFixture<OfficialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

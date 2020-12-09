import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfficialDocumentComponent } from './official-document.component';

describe('OfficialDocumentComponent', () => {
  let component: OfficialDocumentComponent;
  let fixture: ComponentFixture<OfficialDocumentComponent>;

  const mockDocument = {
    "title": "Managing and Sharing Data",
    "summary": "A guide from the UK Data Archive on managing and sharing data.",
    "__typename": "OfficialDocuments"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialDocumentComponent);
    component = fixture.componentInstance;
    component.contentItem = mockDocument;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

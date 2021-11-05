import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { OfficialDocuments } from '@app/graphql/schema';
import { MockModule } from 'ng-mocks';

import { DocumentCardComponent } from './document-card.component';

describe('DocumentCardComponent', () => {
  let component: DocumentCardComponent;
  let fixture: ComponentFixture<DocumentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCardComponent ],
      imports: [
        MockModule(MatCardModule)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const document: OfficialDocuments = {
      contentfulMetadata: {
        tags: []
      },
      document: null,
      linkedFrom: null,
      summary: '',
      sys: {
        environmentId: '',
        firstPublishedAt: 0,
        id: '',
        publishedAt: 0,
        publishedVersion: 0,
        spaceId: ''
      },
      title: 'Test Document',
      url: ''
    }
    fixture = TestBed.createComponent(DocumentCardComponent);
    component = fixture.componentInstance;

    component.document = document;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

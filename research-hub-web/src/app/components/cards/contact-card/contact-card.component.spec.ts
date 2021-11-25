import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@app/app.material.module';
import { Person } from '@app/graphql/schema';
import { MockModule } from 'ng-mocks';

import { ContactCardComponent } from './contact-card.component';

describe('ContactCardComponent', () => {
  let component: ContactCardComponent;
  let fixture: ComponentFixture<ContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCardComponent ],
      imports: [
        MockModule(MaterialModule)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const person: Person = {
      contentfulMetadata: {
        tags: []
      },
      email: '',
      link: '',
      linkedFrom: null,
      name: 'Test Person',
      phone: '0',
      role: '',
      sys: {
        environmentId: '',
        firstPublishedAt: 0,
        id: '',
        publishedAt: 0,
        publishedVersion: 0,
        spaceId: ''
      }
    }

    fixture = TestBed.createComponent(ContactCardComponent);
    component = fixture.componentInstance;

    component.person = person;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { OrgUnit } from '@app/graphql/schema';
import { MockModule } from 'ng-mocks';

import { OrgUnitCardComponent } from './org-unit-card.component';

describe('OrgUnitCardComponent', () => {
  let component: OrgUnitCardComponent;
  let fixture: ComponentFixture<OrgUnitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgUnitCardComponent ],
      imports: [
        MockModule(MatCardModule)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const orgUnit: OrgUnit = {
      contentfulMetadata: {
        tags: []
      },
      description: '',
      displayOrder: 0,
      link: null,
      linkedFrom: null,
      maoriName: '',
      name: 'Test Org Unit',
      sys: {
        environmentId: '',
        firstPublishedAt: 0,
        id: '',
        publishedAt: 0,
        publishedVersion: 0,
        spaceId: ''
      }
    }
    fixture = TestBed.createComponent(OrgUnitCardComponent);
    component = fixture.componentInstance;

    component.orgUnit = orgUnit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

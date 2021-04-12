import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { cleanStylesFromDOM } from './../../../../test-helpers';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let breadCrumbs = [
        {
          'title': 'Engagement',
          'slug': 'engagement'
        },
        {
          'title': 'Our Services',
          'slug': 'our-services'
        },
        {
          'title': 'Centre for eResearch',
          'slug': 'cer'
        }
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    component.contentItem = breadCrumbs;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    cleanStylesFromDOM();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

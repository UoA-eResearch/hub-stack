import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CerGraphqlService, SubHubTitleAndSlug } from '@services/cer-graphql.service';
import { MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let breadCrumbs: SubHubTitleAndSlug[] = [
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
      declarations: [ BreadcrumbsComponent ],
      imports: [RouterTestingModule],
      providers: [
        MockProvider(CerGraphqlService, {
          getParentSubHubs: async () => breadCrumbs
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request breadcrumbs array from cer-graphql service', async () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.parentSubHubs).toBe(breadCrumbs);
    })
  });

  it('should display home as the first breadcrumb', async () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      const homeBreadcrumb = fixture.nativeElement.querySelector('#home');
      expect(homeBreadcrumb.textContent).toContain('Home');
    })
  });

  it('should display the subhub parents breadcrumbs', async () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const spans = fixture.nativeElement.querySelectorAll('span');
      expect(spans.length).toBe(5);
      expect(spans[1].textContent).toContain('Centre for eResearch');
    })
  });

  it('should display the page title breadcrumb', async () => {
    component.title = 'Test'
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const currentPageBreadcrumb = fixture.nativeElement.querySelector('#breadcrumb-current-page');
      expect(currentPageBreadcrumb.textContent).toContain('Test');
    })
  });
});

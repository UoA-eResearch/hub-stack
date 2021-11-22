import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from './breadcrumbs.component';

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
      declarations: [ BreadcrumbsComponent ],
      imports: [RouterTestingModule],
      providers: [
        MockProvider(CerGraphqlService),
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
});

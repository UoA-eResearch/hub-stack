import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ArticleListComponent } from '@app/components/articles/article-list/article-list.component';
import { SharedModule } from '@app/components/shared/app.shared.module';
import { Capability } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';

import { CapabilityComponent } from './capability.component';

const testSlug = 'first-capability';

describe('CapabilityComponent', () => {
  let component: CapabilityComponent;
  let fixture: ComponentFixture<CapabilityComponent>;
  let controller: ApolloTestingController;

  const mockCapability$: Observable<Capability> = of(
    {
      '__typename': 'Capability',
      'sys': {
        'id': '111'
      },
      'slug': 'first-capability',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': false,
      'searchable': false
    } as unknown as Capability);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapabilityComponent],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([
          { path: 'article/list', component: ArticleListComponent }
        ])
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(ActivatedRoute).params = of({
      slug: testSlug
    });
    fixture = TestBed.createComponent(CapabilityComponent);
    controller = TestBed.inject(ApolloTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(CapabilityComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      // component.ngOnInit();
    });

    it('Should get a single article data', () => {
      spyOn(component, 'getCapabilityBySlug').and.returnValue(mockCapability$);

      fixture.whenStable().then(() => {
        component.getCapabilityBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    });
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { SoftwareComponent } from './software.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Software } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { SoftwareListComponent } from '../software-list/software-list.component';

describe('SoftwareComponent', () => {
  let component: SoftwareComponent;
  let fixture: ComponentFixture<SoftwareComponent>;
  let controller: ApolloTestingController;

  const testSlug: string = 'death-star';

  const mockSoftware$: Observable<Software> = of(
    {
      '__typename': 'Software',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Software);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SoftwareComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'software/list', component: SoftwareListComponent }
        ]),
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule)
      ], providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(ActivatedRoute).params = of({
      slug: testSlug
    });
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(SoftwareComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.ngOnInit();
    })

    it('Should get a single software data by Slug', () => {
      spyOn(component, 'getSoftwareBySlug').and.returnValue(mockSoftware$);
      
      fixture.whenStable().then(() => {
        component.getSoftwareBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    })
  });
});

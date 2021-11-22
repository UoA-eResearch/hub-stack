import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { ServiceComponent } from './service.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServiceCollection, AllServicesGQL, Service } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';

describe('ServicesComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;
  let controller: ApolloTestingController;

  const mockAllServices$: Observable<ServiceCollection> = of({
    'items': [
      {
        '__typename': 'Service',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'ServiceCollection'
  } as ServiceCollection);

  const mockService$: Observable<Service> = of(
    {
      '__typename': 'Service',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Service);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServiceComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule,
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
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all Service', () => {
  //   spyOn(component, 'getAllServices').and.returnValue(mockAllServices$);
  //   component.getAllServices().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })

  // describe('When a url slug is present', async () => {
  //   beforeEach(() => {
  //     controller = TestBed.inject(ApolloTestingController);
  //     fixture = TestBed.createComponent(ServiceComponent);
  //     component = fixture.componentInstance;
  //     TestBed.inject(ActivatedRoute).params = of({
  //       slug: 'death-star'
  //     });
  //     fixture.detectChanges();
  //   })

  //   it('Should get a single service data by Slug', () => {
  //     spyOn(component, 'getServiceBySlug').and.returnValue(mockService$);
  //     component.getServiceBySlug(component.slug).subscribe(res => {
  //       expect(res.slug).toEqual('death-star');
  //     });
  //   })
  // });
});
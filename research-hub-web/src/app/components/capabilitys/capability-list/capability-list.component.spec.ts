import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/components/shared/app.shared.module';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { CapabilityCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';

import { CapabilityListComponent } from './capability-list.component';

describe('CapabilityListComponent', () => {
  let component: CapabilityListComponent;
  let fixture: ComponentFixture<CapabilityListComponent>;

  const mockAllCapabilities$: Observable<CapabilityCollection> = of({
    'items': [
      {
        '__typename': 'Capability',
        'slug': 'first-capability',
        'title': 'First capability',
        'summary': 'A brief description of the first capability. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
        'ssoProtected': false,
        'searchable': true
      },
      {
        '__typename': 'Capability',
        'slug': 'top-secret-capability',
        'title': 'Top Secret Capability',
        'summary': 'For testing SSO',
        'ssoProtected': true,
        'searchable': true
      }
    ],
    '__typename': 'CapabilityCollection'
  } as CapabilityCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CapabilityListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all capabilities', () => {
    spyOn(component, 'loadContent').and.returnValue(mockAllCapabilities$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(1);
      });
    })
  });
});

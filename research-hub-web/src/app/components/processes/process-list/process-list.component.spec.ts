import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ProcessListComponent } from './process-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { ProcessCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('ProcessListComponent', () => {
  let component: ProcessListComponent;
  let fixture: ComponentFixture<ProcessListComponent>;
  let controller: ApolloTestingController;

  const mockAllProcesses$: Observable<ProcessCollection> = of({
    'items': [
      {
        '__typename': 'Process',
        'slug': 'first-process',
        'title': 'First process',
        'summary': 'A brief description of the first process. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
        'ssoProtected': false,
        'searchable': true
      },
      {
        '__typename': 'Process',
        'slug': 'top-secret-process',
        'title': 'Top Secret Process',
        'summary': 'For testing SSO',
        'ssoProtected': true,
        'searchable': true
      }
    ],
    '__typename': 'ProcessCollection'
  } as ProcessCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProcessListComponent,
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
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all processs', () => {
    spyOn(component, 'loadContent').and.returnValue(mockAllProcesses$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(1);
      });
    })
  });
});

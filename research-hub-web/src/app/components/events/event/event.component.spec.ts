import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { EventComponent } from './event.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Event } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { EventListComponent } from '../event-list/event-list.component';

describe('EventsComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let controller: ApolloTestingController;

  const mockEvent$: Observable<Event> = of(
    {
      '__typename': 'Event',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Event);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'event/list', component: EventListComponent }
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
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(EventComponent);
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
    const testSlug: string = 'death-star';

    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(EventComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: testSlug
      });
      fixture.detectChanges();
      component.ngOnInit();
    })

    it('Should get a single Event data by Slug', () => {
      spyOn(component, 'getEventBySlug').and.returnValue(mockEvent$);
      component.getEventBySlug(testSlug).subscribe(res => {
        expect(res.slug).toEqual(testSlug);
      });
    })
  });
});

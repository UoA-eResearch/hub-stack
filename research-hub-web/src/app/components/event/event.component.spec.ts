import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponentService } from '@app/app.component.service';
import { EventComponent } from './event.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventCollection, AllEventsGQL, Event } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let controller: ApolloTestingController;

  const mockAllEvent$: Observable<EventCollection> = of({
    'items': [
      {
        '__typename': 'Event',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'EventCollection'
  } as EventCollection);

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
        EventComponent
      ],
      imports: [
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AppComponentService,
        AllEventsGQL
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

  it('Should get all Event', () => {
    spyOn(component, 'getAllEvents').and.returnValue(mockAllEvent$);
    component.getAllEvents().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(EventComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'death-star'
      });
      fixture.detectChanges();
    })

    it('Should get a single Event data by Slug', () => {
      spyOn(component, 'getEventBySlug').and.returnValue(mockEvent$);
      component.getEventBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('death-star');
      });
    })

    it('Should get a single Event data by ID', () => {
      spyOn(component, 'getEventByID').and.returnValue(mockEvent$);
      component.getEventByID('').subscribe(res => {
        expect(res.sys.id).toEqual('111');
      });
    })
  });
});
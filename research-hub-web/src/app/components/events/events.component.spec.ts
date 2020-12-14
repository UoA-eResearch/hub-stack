import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { Observable, of } from 'rxjs';
import { EventCollection, AllEventsGQL, Event } from '@graphql/schema';
import { AppComponentService } from '../../app.component.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let controller: ApolloTestingController;
  const mockAllEvents$: Observable<EventCollection> = of({
    'items': [
      {
        "title": "Handel's Messiah",
        "slug": "handels-messiah"
      },
      {
        "title": "Test - Rodgers & Hammersteins Cinderella",
        "slug": "rodgers-and-hammersteins-cinderella"
      },
      {
        "title": "Demo - Managing Research Data Workshops",
        "slug": "demo-managing-research-data-workshops"
      }
    ],
    '__typename': 'EventCollection'
  } as EventCollection);
  const mockEvent$: Observable<Event> = of({
    'sys': {
      'id' : '111'
    },
    "title": "Handel's Messiah",
    "slug": "handels-messiah",
    '__typename': 'Event'
  } as Event);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [ 
        AppComponentService,
        AllEventsGQL
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all events', () => {
    spyOn(component, 'getAllEvents').and.returnValue(mockAllEvents$);
    component.getAllEvents().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(EventsComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'handels-messiah'
      });
      fixture.detectChanges();
    });

    it('Should get a single event data', () => {
      spyOn(component, 'getEventBySlug').and.returnValue(mockEvent$);
      component.getEventBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('handels-messiah');
      });
    });

    it('Should get a single article data by ID', () => {
      spyOn(component, 'getEventByID').and.returnValue(mockEvent$);
      component.getEventByID('').subscribe(res => {
        expect(res.sys.id).toEqual('111');
      });
    })
  });
});


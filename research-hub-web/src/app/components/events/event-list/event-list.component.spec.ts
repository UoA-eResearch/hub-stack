import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { EventListComponent } from './event-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

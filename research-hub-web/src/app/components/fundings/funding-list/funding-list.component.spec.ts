import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { FundingListComponent } from './funding-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('FundingListComponent', () => {
  let component: FundingListComponent;
  let fixture: ComponentFixture<FundingListComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingListComponent ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(FundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

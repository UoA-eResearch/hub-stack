import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { LegacyRoutingComponent } from './legacy-routing.component';

describe('LegacyRoutingComponent', () => {
  let component: LegacyRoutingComponent;
  let fixture: ComponentFixture<LegacyRoutingComponent>;
  // let controller: ApolloTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyRoutingComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          // Set up mock routes to make test pass.
          {
            path: "error/:errorCode",
            redirectTo: "",
          }
        ]),
        // ApolloTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

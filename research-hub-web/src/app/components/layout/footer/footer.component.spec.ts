import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { AppLayoutModule } from '../layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        MockModule(AppLayoutModule),
        RouterTestingModule.withRoutes([]),
        ApolloTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

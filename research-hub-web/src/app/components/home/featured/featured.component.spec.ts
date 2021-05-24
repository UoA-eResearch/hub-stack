import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { FeaturedComponent } from './featured.component';

fdescribe('FeaturedComponent', () => {
  let component: FeaturedComponent;
  let fixture: ComponentFixture<FeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedComponent ],
      imports: [RouterTestingModule.withRoutes([]), ApolloTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent } from 'ng-mocks';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ContentTitleComponent } from '../content-title/content-title.component';
import { FeaturedComponent } from './featured.component';

describe('FeaturedComponent', () => {
  let component: FeaturedComponent;
  let fixture: ComponentFixture<FeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeaturedComponent,
        MockComponent(ContentTitleComponent),
        MockComponent(ContentContainerComponent)
      ],
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

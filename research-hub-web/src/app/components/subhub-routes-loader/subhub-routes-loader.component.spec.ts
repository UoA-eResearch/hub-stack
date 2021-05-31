import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { SubHubRoutesLoaderComponent } from './subhub-routes-loader.component';

const routes = [
  { path: '', component: SubHubRoutesLoaderComponent }
];

describe('SubHubRoutesLoaderComponent', () => {
  let component: SubHubRoutesLoaderComponent;
  let fixture: ComponentFixture<SubHubRoutesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHubRoutesLoaderComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ApolloTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHubRoutesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

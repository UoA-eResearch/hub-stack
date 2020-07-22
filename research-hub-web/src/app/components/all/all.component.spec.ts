import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComponent } from './all.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllComponent],
      imports: [ApolloTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

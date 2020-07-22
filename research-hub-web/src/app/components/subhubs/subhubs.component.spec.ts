import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhubsComponent } from './subhubs.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('SubhubsComponent', () => {
  let component: SubhubsComponent;
  let fixture: ComponentFixture<SubhubsComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubhubsComponent],
      imports: [ApolloTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(SubhubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

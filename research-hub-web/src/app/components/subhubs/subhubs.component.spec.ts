import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhubsComponent } from './subhubs.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SharedModule } from '../shared/app.shared.module';
import { SubhubsRoutingModule } from './subhubs-routing.module';
import { RouterModule } from '@angular/router';

describe('SubhubsComponent', () => {
  let component: SubhubsComponent;
  let fixture: ComponentFixture<SubhubsComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubhubsComponent],
      imports: [
        ApolloTestingModule,
        RouterModule.forRoot([]),
      ]
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

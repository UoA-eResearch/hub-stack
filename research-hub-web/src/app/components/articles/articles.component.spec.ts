import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent],
      imports: [
        ApolloTestingModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Results as title', async () => {
    const de = fixture.debugElement.query(By.css('#title'));
    expect(de.nativeElement.innerHTML).toEqual('Results');
  });

});

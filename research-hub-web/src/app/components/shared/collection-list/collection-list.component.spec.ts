import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { SharedModule } from '../app.shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockModule } from 'ng-mocks';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [
        MockModule(SharedModule),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

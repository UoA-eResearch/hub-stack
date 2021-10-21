import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksQuoteComponent } from './blocks-quote.component';

describe('BlocksQuoteComponent', () => {
  let component: BlocksQuoteComponent;
  let fixture: ComponentFixture<BlocksQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

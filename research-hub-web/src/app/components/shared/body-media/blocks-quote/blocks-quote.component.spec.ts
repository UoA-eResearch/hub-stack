import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS, INLINES, Text } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BlocksQuoteComponent } from './blocks-quote.component';

describe('BlocksQuoteComponent', () => {
  let component: BlocksQuoteComponent;
  let fixture: ComponentFixture<BlocksQuoteComponent>;
  
  const node = {
    "data": {},
    "content": [],
    "nodeType": BLOCKS.QUOTE
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksQuoteComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = node;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

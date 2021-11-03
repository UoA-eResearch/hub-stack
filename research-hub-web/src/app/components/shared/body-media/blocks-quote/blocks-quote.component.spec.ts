import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BLOCKS, Text as richText } from '@contentful/rich-text-types';
import { RouterTestingModule } from '@angular/router/testing';
import { BlocksQuoteComponent } from './blocks-quote.component';

describe('BlocksQuoteComponent', () => {
  let component: BlocksQuoteComponent;
  let fixture: ComponentFixture<BlocksQuoteComponent>;
  
  const textNode: richText = {
    "data": {},
    "marks": [],
    "value": "Maori involvement in research that is relevant to Maori is advocated for via the Vision Matauranga policy. It is not possible to unlock the Maori knowledge/dimension unless Maori people are participating. Vision Matauranga enables opportunities for Maori leadership in research, stronger relationships with Maori and Maori as participants not just subjects. ",
    "nodeType": "text"
  };

  const node = {
    "data": {},
    "content": [{
      "data": {},
      "content": [textNode],
      "nodeType": BLOCKS.PARAGRAPH
    }],
    "nodeType": BLOCKS.QUOTE
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksQuoteComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksQuoteComponent);
    component = fixture.componentInstance;
    component.node = node;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have content item', () => {
    expect(component.contentItem).toBeTruthy();
  });
});

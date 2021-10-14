import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksEmbeddedAssetComponent } from './blocks-embedded-asset.component';

describe('BlocksEmbeddedAssetComponent', () => {
  let component: BlocksEmbeddedAssetComponent;
  let fixture: ComponentFixture<BlocksEmbeddedAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksEmbeddedAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksEmbeddedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

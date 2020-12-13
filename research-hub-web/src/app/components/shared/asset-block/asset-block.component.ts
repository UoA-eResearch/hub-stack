import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asset-block',
  templateUrl: './asset-block.component.html',
  styleUrls: ['./asset-block.component.scss']
})
export class AssetBlockComponent implements OnInit {

  @Input() contentItem;
  constructor() { }

  ngOnInit() { 
    console.log(this.contentItem);
    this.contentItem['size'] = Math.round(this.contentItem['size'] / 1000) + (Math.round(this.contentItem['size'] % 1000) / 100);
  }

}

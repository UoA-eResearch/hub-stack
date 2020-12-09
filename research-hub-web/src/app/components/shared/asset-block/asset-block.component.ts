import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asset-block',
  templateUrl: './asset-block.component.html',
  styleUrls: ['./asset-block.component.scss']
})
export class AssetBlockComponent implements OnInit {

  @Input() contentItem;
  constructor() { }

  ngOnInit(): void {
  }

}

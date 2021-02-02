import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { LayoutService } from '@services/layout.service';
import { 
  categoryOptions,
  categoryOptionsGQL 
} from '@app/global/global-variables';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  public categoryOptions = categoryOptions;
  public categoryOptionsGQL = categoryOptionsGQL;

  private mediaSub: Subscription;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;

  constructor(private media: MediaObserver,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.updateCols(this.layoutService.getMQAlias());

    this.mediaSub = this.media.media$.subscribe((change: MediaChange) => {
      this.updateCols(change.mqAlias);
    });
  }

  updateCols(mqAlias: string) {
    const cols = this.layoutService.getNumGridCols(mqAlias);
    this.numCols = Math.min(this.maxCols, cols);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
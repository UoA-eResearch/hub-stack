import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {OptionsService} from 'app/services/options.service';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {LayoutService} from 'app/services/layout.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  private mediaSub: Subscription;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;

  constructor(public optionsService: OptionsService, private media: MediaObserver,
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

  getCategoryDescription(categoryId: number) {
    switch(categoryId) {
      case 1:
        return 'Browse all the items listed in the Hub.';
      case 2:
        return 'Specialised, technical, or IT support that can assist your research. Find out who you can speak to, and what services and resources are available from across the University to enable and accelerate your work.';
      case 3:
        return 'Large scale and specialist equipment available across the University that can help you answer your research questions or produce creative works.';
      case 4:
        return 'Workshops, seminars, or training opportunities where you can upskill in a broad range of areas to learn new software, tools, or techniques to improve your research and develop expertise.';
      case 5:
        return 'Applications and software provided or licensed by the University that can help you with a host of general or specific research activities.';
      case 6:
        return 'Places, locations, specialised infrastructure, and collections of equipment you can make use of for your research.';
      case 7:
        return 'Short articles and useful information on a broad range of topics that can help your research and creative endeavours at the University of Auckland.';
      case 8:
        return 'Find people with the skills and knowledge related to support offerings described in the Hub who can help you make things happen.';
      case 9:
        return 'Quick links to selected University policies, standards, or guidelines that may apply to research activities or the use of some services.';
    }
  }

}

import { Component, Input } from '@angular/core';
import { SearchContext } from '@app/global/searchTypes';


@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent {
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";

  @Input() searchText: string;
  @Input() searchContext: SearchContext;

  constructor() { }

}

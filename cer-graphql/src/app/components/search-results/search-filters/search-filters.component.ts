import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { Tag } from '../mat-tags/mat-tags.component';
import { ResearchHubApiService, PeopleParams, Params } from '@services/research-hub-api.service';
import { SearchResultsComponent } from '../search-results.component';
import { ListItem } from '@model/ListItem';
import { OrgUnit } from '@model/OrgUnit';
import { AnalyticsService } from '@services/analytics.service';
import {
  RoleTypeId,
  OptionType,
  CategoryId,
  ContentTypeId
} from '@app/global/global-variables';


@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  public categoryOptions: any[];
  public contentTypeMap: any;
  private searchCatSub: Subscription;
  private dataSub: Subscription;

  @Input()
  public filtersForm: FormGroup;

  /**
  * Determines whether we should show certain widgets in a small size.
  */
  @Input()
  public compact: boolean = false;

  public personTagSource: Tag[] = [];
  public orgUnitTagSource: Tag[] = [];

  constructor(
    private apiService: ResearchHubApiService, 
    public analyticsService: AnalyticsService) {
      this.contentTypeMap = {};
      this.contentTypeMap[CategoryId.Support] = [ContentTypeId.Support];
      this.contentTypeMap[CategoryId.Equipment] = [ContentTypeId.Equipment];
      this.contentTypeMap[CategoryId.Training] = [ContentTypeId.Training];
      this.contentTypeMap[CategoryId.Software] = [ContentTypeId.Software];
      this.contentTypeMap[CategoryId.Facilities] = [ContentTypeId.Facilities];
      this.contentTypeMap[CategoryId.Guide] = [ContentTypeId.Guide, ContentTypeId.KnowledgeArticle];

      this.categoryOptions = [
        { id: CategoryId.All, name: 'All Categories', icon: 'public', type: OptionType.Category },
        { id: CategoryId.Support, name: 'Service', icon: 'local_play', type: OptionType.Category },
        { id: CategoryId.Equipment, name: 'Equipment', icon: 'build', type: OptionType.Category },
        { id: CategoryId.Training, name: 'Training', icon: 'school', type: OptionType.Category },
        { id: CategoryId.Software, name: 'Software', icon: 'desktop_mac', type: OptionType.Category },
        { id: CategoryId.Facilities, name: 'Facility', icon: 'home', type: OptionType.Category },
        { id: CategoryId.Guide, name: 'Guide', icon: 'import_contacts', type: OptionType.Category },
        { id: CategoryId.Person, name: 'People', icon: 'face', type: OptionType.Category },
        { id: CategoryId.Policies, name: 'Policy', icon: 'gavel', type: OptionType.Category },
      ];
  }

  ngOnInit() {
    this.updateFilterVisibility(this.filtersForm.controls.categoryId.value); // Set inital filter visibility based on current category id

    // Update filter visibility when categoryId changes
    this.searchCatSub = this.filtersForm.controls.categoryId.valueChanges.subscribe((categoryId) => {
      this.updateFilterVisibility(categoryId);
    });

    const peopleParams = new PeopleParams();
    peopleParams.setRoleTypes([RoleTypeId.UserSupport]);

    this.dataSub = forkJoin(
      this.apiService.getPeople(peopleParams),
      this.apiService.getOrgUnits(new Params())
    ).subscribe(latestValues => {
      const [peoplePage, orgUnitPage] = latestValues;

      this.personTagSource = this.listItemToTags(peoplePage.content);
      this.orgUnitTagSource = this.orgUnitToTags(orgUnitPage.content);
    });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  listItemToTags(items: ListItem[]) {
    return items.map(item => {
      return { id: item.id, text: item.title, imageUrl: this.apiService.getAssetUrl(item.image) };
    });
  }

  orgUnitToTags(items: OrgUnit[]) {
    return items.map(item => {
      return { id: item.id, text: item.name, imageUrl: this.apiService.getAssetUrl(item.image) };
    });
  }

  setCategory(value) {
    this.filtersForm.controls.categoryId.setValue(value);
    this.analyticsService.trackUserExperience('Filter panel', 'filter by category')
  }

  updateFilterVisibility(categoryId: number) {
    const visibilities = SearchResultsComponent.getFilterVisibility(categoryId),
      controls = this.filtersForm.controls;
    if (visibilities['person']) {
      controls.personTags.enable();
    } else {
      controls.personTags.disable();
    }
    if (visibilities['orgUnit']) {
      controls.orgUnitTags.enable();
    } else {
      controls.orgUnitTags.disable();
    }
    if (visibilities['researchActivity']) {
      controls.researchActivityIds.enable();
    } else {
      controls.researchActivityIds.disable();
    }
  }
}

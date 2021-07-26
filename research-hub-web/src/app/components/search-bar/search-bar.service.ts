import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { 
  AllCategoriesGQL,
  AllStagesGQL,
  AllOrganisationsGQL,
  AllPagesGQL,
  AllItemsByCategoryGQL,
  AllItemsByStageGQL,
  AllItemsByOrganisationGQL,
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
  EventCollection,
  AllEventsGQL
} from '@app/graphql/schema';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SearchBarService {

  public searchChange: Subject<any> = new Subject<any>();
  public searchCategoryChange: Subject<any> = new Subject<any>();
  public searchStageChange: Subject<any> = new Subject<any>();
  public searchOrganisationChange: Subject<any> = new Subject<any>();
  public resultsChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchTextChange: Subject<any> = new Subject<any>();
  public currentPageChange: Subject<any> = new Subject<any>();
  public totalPagesChange: Subject<any> = new Subject<any>();
  public sortTypeChange: Subject<any> = new Subject<any>();
  public searchText: string;
  public category: Array<any> = new Array<any>();
  public stage: Array<any> = new Array<any>();
  public organisation: Array<any> = new Array<any>();
  public resultArray;
  public currentPage;
  public totalPages;
  public sortType;
  public eventIdChange: Subject<any> = new Subject<any>();
  public eventId;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public allStagesGQL: AllStagesGQL,
    public allOrganisationsGQL: AllOrganisationsGQL,
    public allPagesGQL: AllPagesGQL,
    public allItemsByCategoryGQL: AllItemsByCategoryGQL,
    public allItemsByStageGQL: AllItemsByStageGQL,
    public allItemsByOrganisationGQL: AllItemsByOrganisationGQL,
    public allEventsGQL: AllEventsGQL,
    private http: HttpClient
  ) { }


  // Category
  setCategory(category) {
    if (category !== undefined) {
      this.category = category;
      this.searchCategoryChange.next(category);
    }
  }
  getCategory() {
    return this.category;
  }

  // Category
  setEventId(eventId) {
    if (eventId !== undefined) {
      this.eventId = eventId;
      this.eventIdChange.next(eventId);
    }
  }
  getEventId() {
    return this.eventId;
  }

  // Stage
  setStage(stage) {
    if (stage !== undefined) {
      this.stage = stage;
      this.searchStageChange.next(stage);
    }
  }
  getStage() {
    return this.stage;
  }


  // Organisation
  setOrganisation(organisation) {
    if (organisation !== undefined) {
      this.organisation = organisation;
      this.searchOrganisationChange.next(organisation);
    }
  }
  getOrganisation() {
    return this.organisation;
  }

  // Sort Type
  setSort(sortType) {
    if (sortType !== undefined) {
      this.sortType = sortType;
      this.sortTypeChange.next(sortType);
    }
  }
  getSort() {
    return this.sortType;
  }

  // Current Page
  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
    this.currentPageChange.next(currentPage);
  }
  getCurrentPage() {
    return this.currentPage;
  }

  // Toal Pages
  setTotalPages(totalPages) {
    this.totalPages = totalPages;
    this.totalPagesChange.next(totalPages);
  }
  getTotalPages() {
    return this.totalPages;
  }

  // Search Text
  setSearchText(searchText) {
      this.searchText = searchText;
      this.searchTextChange.next(searchText);
  }
  getSearchText() {
    return this.searchText;
  }

  // Search Results
  getResults() {
    return this.resultArray;
  }
  setResults(results) {
      this.resultArray = results;
      this.resultsChange.next(results);
  }

   // Get all research stages
   public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }

  // Get all research categories
  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  // Get all organisations
  public getAllOrganisations(): Observable<OrgUnitCollection> {
    try {
      return this.allOrganisationsGQL.fetch()
        .pipe(pluck('data', 'orgUnitCollection')) as Observable<OrgUnitCollection>
    } catch (e) { console.error('Error loading all organisations:', e) };
  }

  // Get all Events
  public getAllEvents(): Observable<EventCollection> {
    try {
      return this.allEventsGQL.fetch()
        .pipe(pluck('data', 'eventCollection')) as Observable<EventCollection>
    } catch (e) { console.error('Error loading all Events:', e) };
  }

  // Get All Pages
  public getAllPages() {
    try {
      return this.allPagesGQL.fetch()
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Category
  public getAllItemsByCategory(filter) {
    try {
      return this.allItemsByCategoryGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Stage
  public getAllItemsByStage(filter) {
    try {
      return this.allItemsByStageGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Organisation
  public getAllItemsByOrganisation(filter) {
    try {
      return this.allItemsByOrganisationGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Create list result
  public createResultsList() {
      let pageTypes = ["equipment", "event", "article", "service", "subhub", "software", "casestudy", "funding"];

      // Set page number to 1 as default
      if (this.getCurrentPage() == undefined) this.setCurrentPage(1);
      this.setTotalPages(this.getTotalPages());

      // Triggers loading animation on collection page
      this.setTotalPages(this.getTotalPages());

      // Create deep copy of category array to handle events manually
      let categories = this.getCategory().map(x => { return  x });

      // If event is selected, remove it from search parameters, event is a content model so must be handled differently
      if (this.getCategory().includes(this.getEventId())) {
        categories.splice(this.getCategory().indexOf(this.getEventId()), 1)
        pageTypes = ["event"]
      }

      // Create the search query
        let query = {
          query: this.getSearchText(),
          size: 10,
          from: (this.getCurrentPage() - 1) * 10,
          sort: this.getSort(),
          filters: {
            relatedOrgs: this.getOrganisation(),
            stage: this.getStage(),
            category: categories
          },
          includeContentTypes : pageTypes
        };

        // Send the POST request
        this.http.post(environment.searchUrl, query).subscribe(data => {
          let array = [];
          data["result"]["hits"]["hits"].forEach(element => {
            let result = {
              "title": element._source.fields.title["en-US"],
              "summary" : element._source.fields.summary["en-US"],
              "slug" : element._source.fields.slug["en-US"],
              "ssoProtected" : element._source.fields.ssoProtected["en-US"],
              "__typename" : element._source.sys.contentType.sys.id,
              "icon": element._source.fields.icon?.["en-US"]["url"]
            }
            array.push(result);
          });
          
          const resultsTotal = data["result"]["hits"]["total"]["value"];

          // Create the results
          this.setResults(array);
          this.setTotalPages(resultsTotal);
          
          // push search query info to GTM dataLayer
          window.dataLayer.push({
            'event': 'search',
            'searchQuery': this.getSearchText(),
            'resultsTotal': resultsTotal
          });
        })
  }
}
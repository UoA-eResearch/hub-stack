
import {retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

import {Content} from '../model/Content';
import {GuideCategory} from '../model/GuideCategory';
import {Person} from '../model/Person';
import {OrgUnit} from '../model/OrgUnit';
import {Page} from '../model/Page';
import {ListItem} from '../model/ListItem';



export enum OrderBy {
  Relevance = 'relevance',
  Alphabetical = 'alphabetical'
}


export class Params {
  private page = 0;
  private size = 1000;
  private searchText: string;
  private orderBy: OrderBy = OrderBy.Relevance;

  public static getIdArrayParams(params: any, names: string[], idArrays: number[][]): any {

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const variable = idArrays[i];

      if (variable != null && variable.length > 0) {
        params[name] = variable.join(',');
      }
    }

    return params;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public setSize(size: number) {
    this.size = size;
  }

  public setSearchText(searchText: string) {
    this.searchText = encodeURIComponent(searchText);
  }

  public setOrderBy(orderBy: OrderBy) {
    this.orderBy = orderBy;
  }

  public getParams(): any {
    const params = {};

    let page = this.page;
    let size = this.size;
    if (page == null || page < 0) {
      page = 0;
    }

    if (size == null || size < 1) {
      size = 1;
    }

    params['page'] = page.toString();
    params['size'] = size.toString();

    if (this.searchText != null && this.searchText.trim() !== '') {
      params['searchText'] = this.searchText.trim();
    }

    params['orderBy'] = this.orderBy;

    return params;
  }
}

export class PeopleParams extends Params {

  private orgUnits: number[];
  private contentItems: number[];
  private roleTypes: number[];

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public setContentItems(contentItems: number[]) {
    this.contentItems = contentItems;
  }

  public setRoleTypes(roleTypes: number[]) {
    this.roleTypes = roleTypes;
  }

  public getParams(): any {
    const params = super.getParams();

    const names = ['orgUnits', 'contentItems', 'roleTypes'];
    const variables = [this.orgUnits, this.contentItems, this.roleTypes];
    Params.getIdArrayParams(params, names, variables);

    return params;
  }
}

export class SearchResultsParams extends Params {

  private objectType: string;
  private people: number[];
  private orgUnits: number[];
  private researchPhases: number[];

  private contentItems: number[];
  private roleTypes: number[];
  private contentTypes: number[];

  public setObjectType(objectType: string) {
    this.objectType = objectType;
  }

  public setContentTypes(contentTypes: number[]) {
    this.contentTypes = contentTypes;
  }

  public setContentItems(contentItems: number[]) {
    this.contentItems = contentItems;
  }

  public setRoleTypes(roleTypes: number[]) {
    this.roleTypes = roleTypes;
  }

  public setResearchPhases(researchPhases: number[]) {
    this.researchPhases = researchPhases;
  }

  public setPeople(people: number[]) {
    this.people = people;
  }

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public getParams(): any {
    const params = super.getParams();
    params['objectType'] = this.objectType;

    const names = ['orgUnits', 'contentItems', 'roleTypes', 'contentTypes', 'people', 'researchPhases'];
    const variables = [this.orgUnits, this.contentItems, this.roleTypes, this.contentTypes, this.people, this.researchPhases];
    Params.getIdArrayParams(params, names, variables);

    return params;
  }
}


export class ContentItemsParams extends Params {

  private contentTypes: number[];
  private researchPhases: number[];
  private people: number[];
  private roleTypes: number[];
  private orgUnits: number[];

  public setContentTypes(contentTypes: number[]) {
    this.contentTypes = contentTypes;
  }

  public setResearchPhases(researchPhases: number[]) {
    this.researchPhases = researchPhases;
  }

  public setPeople(people: number[]) {
    this.people = people;
  }

  public setRoleTypes(roleTypes: number[]) {
    this.roleTypes = roleTypes;
  }

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public getParams(): any {
    const params = super.getParams();

    const names = ['contentTypes', 'researchPhases', 'people', 'roleTypes', 'orgUnits'];
    const variables = [this.contentTypes, this.researchPhases, this.people, this.roleTypes, this.orgUnits];
    Params.getIdArrayParams(params, names, variables);

    return params;
  }
}


@Injectable()
export class ResearchHubApiService {

  private static policyUrl = 'policy';
  private static personUrl = 'person';
  private static guideCategoryUrl = 'guideCategory';
  private static contentUrl = 'content';
  private static similarContentUrl = 'similar';
  private static orgUnitUrl = 'orgUnit';
  private static assetUrl = 'assets/';
  private static searchResultsUrl = 'search';
  private static hostname = environment.researchHubApiUrl;
  private static headers = {'Accept': 'application/json'};
  private static numRetries = 3;


  constructor(private http: HttpClient) {

  }

  getAssetUrl(fileName: string) {
    const uriComponent = ResearchHubApiService.hostname + ResearchHubApiService.assetUrl + fileName;
    return encodeURI(uriComponent.trim());
  }

  getContent(id: number) {
    return this.http
      .get<Content>(ResearchHubApiService.hostname + ResearchHubApiService.contentUrl + '/' + id, {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getPerson(id: number) {
    return this.http
      .get<Person>(ResearchHubApiService.hostname + ResearchHubApiService.personUrl + '/' + id, {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getOrgUnit(id: number) {
    return this.http
      .get<OrgUnit>(ResearchHubApiService.hostname + ResearchHubApiService.orgUnitUrl + '/' + id, {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getGuideCategory(id: number) {
    return this.http
      .get<GuideCategory>(ResearchHubApiService.hostname + ResearchHubApiService.guideCategoryUrl + '/' + id, {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getGuideCategoryContentItems(id: number) {
    return this.http
      .get<Content[]>(ResearchHubApiService.hostname + ResearchHubApiService.guideCategoryUrl + '/' + id + '/contentItems', {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getSearchResults(params: SearchResultsParams) {
    return this.http
      .get<Page<ListItem>>(ResearchHubApiService.hostname + ResearchHubApiService.searchResultsUrl, {
        params: params.getParams(),
        headers: ResearchHubApiService.headers
      }).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  // Same query as above, but returns total number of results from each category
  getSearchResultsCategories(params: SearchResultsParams) {
    params.setSize(65535); // Return results from all pages
    params.setPage(0);

    return this.http
      .get(ResearchHubApiService.hostname + ResearchHubApiService.searchResultsUrl,
        {
          params: params.getParams(),
          headers: ResearchHubApiService.headers
        }).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getContentItems(params: ContentItemsParams) {
    return this.http
      .get<Page<ListItem>>(ResearchHubApiService.hostname + ResearchHubApiService.contentUrl, {
        params: params.getParams(),
        headers: ResearchHubApiService.headers
      }).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getSimilarContentItems(id: number) {
    return this.http
      .get<Content[]>(ResearchHubApiService.hostname + ResearchHubApiService.contentUrl + '/' + id + '/' + ResearchHubApiService.similarContentUrl,
        {headers: ResearchHubApiService.headers}).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getPeople(params: PeopleParams) {
    return this.http
      .get<Page<ListItem>>(ResearchHubApiService.hostname + ResearchHubApiService.personUrl, {
        params: params.getParams(),
        headers: ResearchHubApiService.headers
      }).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getOrgUnits(params: Params) {
    return this.http
      .get<Page<OrgUnit>>(ResearchHubApiService.hostname + ResearchHubApiService.orgUnitUrl, {
        params: params.getParams(),
        headers: ResearchHubApiService.headers
      }).pipe(
      retry(ResearchHubApiService.numRetries));
  }

  getPolicies(params: Params) {
    return this.http
      .get<Page<ListItem>>(ResearchHubApiService.hostname + ResearchHubApiService.policyUrl, {
        params: params.getParams(),
        headers: ResearchHubApiService.headers
      }).pipe(
      retry(ResearchHubApiService.numRetries));
  }
}

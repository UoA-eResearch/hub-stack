import { CategoryCollection, OrgUnitCollection, StageCollection } from "@app/graphql/schema"

export interface SearchQuery {
  query: string,
  size: number,
  from: number,
  sort?: SortOrder,
  filters?: SearchFilters,
  includeContentTypes : ContentType[]
}

export interface IntranetSearchQuery {
  query: string,
  size: number,
  page: number,
  sort?: SortOrder
}

export interface SearchFilters {
  relatedOrgs: string[],
  stage: string[],
  category: string[]
}

export interface AllFilters { 
  allCategories: CategoryCollection | null,
  allStages: StageCollection | null,
  allOrganisations: OrgUnitCollection | null
}

export interface SearchResults {
  totalResults: number;
  results: SearchResult[];
}

export interface SearchResult {
  title: string;
  summary: string;
  slug: string;
  ssoProtected: boolean;
  contentType: ContentType;
  chips: SearchResultChip[];
}

export interface SearchResultChip {
  name: string;
  id: string;
}

export interface IntranetSearchResults {
  totalResults: number;
  results: IntranetSearchResult[];
}

export interface IntranetSearchResult {
  title: string;
  summary: string;
  url: string;
}

export type SortOrder = 'A-Z' | 'Z-A' | 'relevance'
export type ContentType = 'article' | 'caseStudy' | 'equipment' | 'event' | 'funding' | 'service' | 'software' | 'subHub'

export enum FilterType {
  ResearchActivity = 1,
  ResearchCategory,
  Organisation
}

export enum SearchContext {
  ResearchHub = 'ResearchHub',
  StaffIntranet = 'Staff Intranet'
}
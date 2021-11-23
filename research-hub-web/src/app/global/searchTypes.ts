export interface SearchQuery {
  query: string,
  size: number,
  from: number,
  sort?: SortOrder,
  filters?: SearchFilters,
  includeContentTypes : ContentType[]
}

export interface SearchFilters {
  relatedOrgs: string[],
  stage: string[],
  category: string[]
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

export type SortOrder = 'A-Z' | 'Z-A' | 'relevance'
export type ContentType = 'article' | 'caseStudy' | 'equipment' | 'event' | 'funding' | 'service' | 'software' | 'subHub'

export enum FilterType {
  ResearchActivity = 1,
  ResearchCategory,
  Organisation
}
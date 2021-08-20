export interface SearchQuery {
  query: string,
  size: number,
  from: number,
  sort?: SortOrder,
  filters?: SearchFilters,
  includeContentTypes : ContentType[]
}

export interface SearchFilters {
  relatedOrgs?: string[],
  stage?: string[],
  category?: string[]
}

export interface SearchResult {
  title: string;
  summary: string;
  slug: string;
  ssoProtected: boolean;
  contentType: ContentType;
  icon: string;
}

export type SortOrder = 'A-Z' | 'Z-A' | 'relevance'
export type ContentType = 'Article' | 'SubHub'

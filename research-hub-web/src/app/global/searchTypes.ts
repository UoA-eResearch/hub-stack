interface SearchQuery {
  query: string,
  size: number,
  from: number,
  sort: SortOrder,
  filters?: SearchFilters,
  includeContentTypes : ContentType[]
}

interface SearchFilters {
  relatedOrgs?: string[],
  stage?: string[],
  category?: string[]
}

interface SearchResult {
  title: string;
  summary: string;
  slug: string;
  ssoProtected: boolean;
  contentType: ContentType;
  icon: string;
}

type SortOrder = 'A-Z' | 'Z-A' | 'relevance'
type ContentType = 'Article' | 'SubHub'

/**
 * This is a list of all types that are searchable/viewable on
 * the ResearchHub
 */
export enum SEARCHABLE_TYPES {
    Article = 'article',
    Equipment = 'equipment',
    Service = 'service',
    CaseStudy = 'caseStudy',
    SubHub = 'subHub'
}

/**
 * For each of these types, the following map contains what fields
 * are always public/searchable.
 *
 * These fields can be used in our queries/*.graphql files to automatically
 * query the correct fields.
 */
const ALWAYS_PUBLIC_FIELDS = new Map<string, string[]>();

// Re-usable standard public fields
const STANDARD_PUBLIC_FIELDS = ['title', 'summary', 'ssoProtected'];

// Define the searchable fields for our searchable types
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.Article, STANDARD_PUBLIC_FIELDS);
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.Equipment, STANDARD_PUBLIC_FIELDS);
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.Service, STANDARD_PUBLIC_FIELDS);
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.CaseStudy, STANDARD_PUBLIC_FIELDS);
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.SubHub, STANDARD_PUBLIC_FIELDS);
ALWAYS_PUBLIC_FIELDS.set(SEARCHABLE_TYPES.Person, ['name', 'title', 'ssoProtected']);

exports = ALWAYS_PUBLIC_FIELDS;

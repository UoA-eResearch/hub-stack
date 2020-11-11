import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};



export type Query = {
  __typename?: 'Query';
  asset: Maybe<Asset>;
  assetCollection: Maybe<AssetCollection>;
  testContentType: Maybe<TestContentType>;
  testContentTypeCollection: Maybe<TestContentTypeCollection>;
  subHub: Maybe<SubHub>;
  subHubCollection: Maybe<SubHubCollection>;
  article: Maybe<Article>;
  articleCollection: Maybe<ArticleCollection>;
  equipment: Maybe<Equipment>;
  equipmentCollection: Maybe<EquipmentCollection>;
  testing: Maybe<Testing>;
  testingCollection: Maybe<TestingCollection>;
  officialDocuments: Maybe<OfficialDocuments>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  service: Maybe<Service>;
  serviceCollection: Maybe<ServiceCollection>;
  caseStudy: Maybe<CaseStudy>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  person: Maybe<Person>;
  personCollection: Maybe<PersonCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<AssetFilter>;
  order: Maybe<Array<Maybe<AssetOrder>>>;
};


export type QueryTestContentTypeArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryTestContentTypeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<TestContentTypeFilter>;
  order: Maybe<Array<Maybe<TestContentTypeOrder>>>;
};


export type QuerySubHubArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QuerySubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<SubHubFilter>;
  order: Maybe<Array<Maybe<SubHubOrder>>>;
};


export type QueryArticleArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<ArticleFilter>;
  order: Maybe<Array<Maybe<ArticleOrder>>>;
};


export type QueryEquipmentArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<EquipmentFilter>;
  order: Maybe<Array<Maybe<EquipmentOrder>>>;
};


export type QueryTestingArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryTestingCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<TestingFilter>;
  order: Maybe<Array<Maybe<TestingOrder>>>;
};


export type QueryOfficialDocumentsArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryOfficialDocumentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<OfficialDocumentsFilter>;
  order: Maybe<Array<Maybe<OfficialDocumentsOrder>>>;
};


export type QueryServiceArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<ServiceFilter>;
  order: Maybe<Array<Maybe<ServiceOrder>>>;
};


export type QueryCaseStudyArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<CaseStudyFilter>;
  order: Maybe<Array<Maybe<CaseStudyOrder>>>;
};


export type QueryPersonArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryPersonCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<PersonFilter>;
  order: Maybe<Array<Maybe<PersonOrder>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  sys: Sys;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  contentType: Maybe<Scalars['String']>;
  fileName: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Int']>;
  url: Maybe<Scalars['String']>;
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  linkedFrom: Maybe<AssetLinkingCollections>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform: Maybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String'];
  spaceId: Scalars['String'];
  environmentId: Scalars['String'];
  publishedAt: Maybe<Scalars['DateTime']>;
  firstPublishedAt: Maybe<Scalars['DateTime']>;
  publishedVersion: Maybe<Scalars['Int']>;
};


export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width: Maybe<Scalars['Dimension']>;
  /** Desired height in pixels. Defaults to the original image height. */
  height: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality: Maybe<Scalars['Quality']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius: Maybe<Scalars['Int']>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor: Maybe<Scalars['HexColor']>;
  /** Desired image format. Defaults to the original image format. */
  format: Maybe<ImageFormat>;
};



export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES'
}


export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  articleCollection: Maybe<ArticleCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  personCollection: Maybe<PersonCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsOfficialDocumentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsPersonCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type Entry = {
  sys: Sys;
};

export type SubHubCollection = {
  __typename?: 'SubHubCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHub>>;
};

/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHub = Entry & {
  __typename?: 'SubHub';
  sys: Sys;
  linkedFrom: Maybe<SubHubLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  body: Maybe<SubHubBody>;
  bannerImage: Maybe<Asset>;
  subhubPagesCollection: Maybe<SubHubSubhubPagesCollection>;
  externalSubHubPage: Maybe<SubHubExternalSubHubPage>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  mediaCollection: Maybe<AssetCollection>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  relatedItemsCollection: Maybe<SubHubRelatedItemsCollection>;
  viewType: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubBodyArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubBannerImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSubhubPagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubExternalSubHubPageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A 'mini site' within the hub - this is both the landing page, or sub-pages for
 * nested hierarchal content composed of other hub entries. See Hub handbook for
 * guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};

export type SubHubLinkingCollections = {
  __typename?: 'SubHubLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
};


export type SubHubLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SubHubBody = {
  __typename?: 'SubHubBody';
  json: Scalars['JSON'];
  links: SubHubBodyLinks;
};


export type SubHubBodyLinks = {
  __typename?: 'SubHubBodyLinks';
  entries: SubHubBodyEntries;
  assets: SubHubBodyAssets;
};

export type SubHubBodyEntries = {
  __typename?: 'SubHubBodyEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type SubHubBodyAssets = {
  __typename?: 'SubHubBodyAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type SubHubSubhubPagesCollection = {
  __typename?: 'SubHubSubhubPagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubSubhubPagesItem>>;
};

export type SubHubSubhubPagesItem = Article | CaseStudy | Equipment | OfficialDocuments | Service | SubHub;

/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type Article = Entry & {
  __typename?: 'Article';
  sys: Sys;
  linkedFrom: Maybe<ArticleLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  banner: Maybe<Asset>;
  displayBanner: Maybe<Scalars['Boolean']>;
  icon: Maybe<Asset>;
  body: Maybe<ArticleBody>;
  mediaCollection: Maybe<AssetCollection>;
  relatedItemsCollection: Maybe<ArticleRelatedItemsCollection>;
  officialDocumentsCollection: Maybe<ArticleOfficialDocumentsCollection>;
  relatedContactsCollection: Maybe<ArticleRelatedContactsCollection>;
  relatedOrganisationsCollection: Maybe<ArticleRelatedOrganisationsCollection>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleDisplayBannerArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleBodyArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleOfficialDocumentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedOrganisationsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A general information page. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  serviceCollection: Maybe<ServiceCollection>;
};


export type ArticleLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EquipmentCollection = {
  __typename?: 'EquipmentCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Equipment>>;
};

/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type Equipment = Entry & {
  __typename?: 'Equipment';
  sys: Sys;
  linkedFrom: Maybe<EquipmentLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  mainImage: Maybe<Asset>;
  overview: Maybe<EquipmentOverview>;
  body: Maybe<EquipmentBody>;
  callToAction: Maybe<Scalars['String']>;
  userFacingSupportCollection: Maybe<EquipmentUserFacingSupportCollection>;
  equipmentOwnerCollection: Maybe<EquipmentEquipmentOwnerCollection>;
  type: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  eligibility: Maybe<EquipmentEligibility>;
  costToUse: Maybe<EquipmentCostToUse>;
  location: Maybe<Scalars['String']>;
  trainingRequired: Maybe<EquipmentTrainingRequired>;
  trainingProvided: Maybe<EquipmentTrainingProvided>;
  yearOfManufacture: Maybe<Scalars['Int']>;
  access: Maybe<EquipmentAccess>;
  helpAndSupport: Maybe<EquipmentHelpAndSupport>;
  features: Maybe<EquipmentFeatures>;
  limitations: Maybe<EquipmentLimitations>;
  considerations: Maybe<EquipmentConsiderations>;
  relatedItemsCollection: Maybe<EquipmentRelatedItemsCollection>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  mediaCollection: Maybe<AssetCollection>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  icon: Maybe<Asset>;
  viewType: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentMainImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentOverviewArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentBodyArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentUserFacingSupportCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentEquipmentOwnerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentTypeArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentManufacturerArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentModelArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentEligibilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentCostToUseArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentTrainingRequiredArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentTrainingProvidedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentYearOfManufactureArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentHelpAndSupportArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentFeaturesArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLimitationsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentConsiderationsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};

export type EquipmentLinkingCollections = {
  __typename?: 'EquipmentLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  serviceCollection: Maybe<ServiceCollection>;
};


export type EquipmentLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EquipmentLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EquipmentLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EquipmentLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ServiceCollection = {
  __typename?: 'ServiceCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Service>>;
};

/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type Service = Entry & {
  __typename?: 'Service';
  sys: Sys;
  linkedFrom: Maybe<ServiceLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  icon: Maybe<Asset>;
  serviceOwnerCollection: Maybe<ServiceServiceOwnerCollection>;
  userFacingSupportCollection: Maybe<ServiceUserFacingSupportCollection>;
  callToAction: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  eligibility: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
  access: Maybe<Scalars['String']>;
  helpAndSupport: Maybe<ServiceHelpAndSupport>;
  details: Maybe<ServiceDetails>;
  features: Maybe<ServiceFeatures>;
  limitations: Maybe<ServiceLimitations>;
  considerations: Maybe<ServiceConsiderations>;
  officialDocumentsCollection: Maybe<ServiceOfficialDocumentsCollection>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedItemsCollection: Maybe<ServiceRelatedItemsCollection>;
  mediaCollection: Maybe<AssetCollection>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceServiceOwnerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceUserFacingSupportCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceOverviewArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceEligibilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCostArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceHelpAndSupportArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceDetailsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceFeaturesArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceLimitationsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceConsiderationsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceOfficialDocumentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A research service catalogue item [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ServiceLinkingCollections = {
  __typename?: 'ServiceLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  serviceCollection: Maybe<ServiceCollection>;
};


export type ServiceLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ServiceServiceOwnerCollection = {
  __typename?: 'ServiceServiceOwnerCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type Person = Entry & {
  __typename?: 'Person';
  sys: Sys;
  linkedFrom: Maybe<PersonLinkingCollections>;
  username: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  jobTitle: Maybe<Scalars['String']>;
  image: Maybe<Asset>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonUsernameArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonNameArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonJobTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A human being [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};

export type PersonLinkingCollections = {
  __typename?: 'PersonLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
};


export type PersonLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsOfficialDocumentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type OfficialDocumentsCollection = {
  __typename?: 'OfficialDocumentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocuments = Entry & {
  __typename?: 'OfficialDocuments';
  sys: Sys;
  linkedFrom: Maybe<OfficialDocumentsLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  document: Maybe<Asset>;
  contactCollection: Maybe<OfficialDocumentsContactCollection>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsUrlArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsDocumentArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Describes and hosts or links to offical documents such as uni policies,
 * guidelines, codes of conduct, terms of use/service, government laws/acts etc
 * related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments)
 */
export type OfficialDocumentsContactCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type OfficialDocumentsLinkingCollections = {
  __typename?: 'OfficialDocumentsLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  serviceCollection: Maybe<ServiceCollection>;
};


export type OfficialDocumentsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OfficialDocumentsLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OfficialDocumentsLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type OfficialDocumentsContactCollection = {
  __typename?: 'OfficialDocumentsContactCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type CaseStudyCollection = {
  __typename?: 'CaseStudyCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CaseStudy>>;
};

/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudy = Entry & {
  __typename?: 'CaseStudy';
  sys: Sys;
  linkedFrom: Maybe<CaseStudyLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  mainImage: Maybe<Asset>;
  content: Maybe<CaseStudyContent>;
  peopleCollection: Maybe<CaseStudyPeopleCollection>;
  callToActionButtonText: Maybe<Scalars['String']>;
  callToActionButtonLink: Maybe<Scalars['String']>;
  acknowledgement: Maybe<CaseStudyAcknowledgement>;
  references: Maybe<CaseStudyReferences>;
  relatedItemsCollection: Maybe<CaseStudyRelatedItemsCollection>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyMainImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyContentArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyPeopleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyCallToActionButtonTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyCallToActionButtonLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyAcknowledgementArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyReferencesArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * An article that describes an example of University research support service in
 * action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyLinkingCollections = {
  __typename?: 'CaseStudyLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  serviceCollection: Maybe<ServiceCollection>;
};


export type CaseStudyLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyContent = {
  __typename?: 'CaseStudyContent';
  json: Scalars['JSON'];
  links: CaseStudyContentLinks;
};

export type CaseStudyContentLinks = {
  __typename?: 'CaseStudyContentLinks';
  entries: CaseStudyContentEntries;
  assets: CaseStudyContentAssets;
};

export type CaseStudyContentEntries = {
  __typename?: 'CaseStudyContentEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type CaseStudyContentAssets = {
  __typename?: 'CaseStudyContentAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type CaseStudyPeopleCollection = {
  __typename?: 'CaseStudyPeopleCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type CaseStudyAcknowledgement = {
  __typename?: 'CaseStudyAcknowledgement';
  json: Scalars['JSON'];
  links: CaseStudyAcknowledgementLinks;
};

export type CaseStudyAcknowledgementLinks = {
  __typename?: 'CaseStudyAcknowledgementLinks';
  entries: CaseStudyAcknowledgementEntries;
  assets: CaseStudyAcknowledgementAssets;
};

export type CaseStudyAcknowledgementEntries = {
  __typename?: 'CaseStudyAcknowledgementEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type CaseStudyAcknowledgementAssets = {
  __typename?: 'CaseStudyAcknowledgementAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type CaseStudyReferences = {
  __typename?: 'CaseStudyReferences';
  json: Scalars['JSON'];
  links: CaseStudyReferencesLinks;
};

export type CaseStudyReferencesLinks = {
  __typename?: 'CaseStudyReferencesLinks';
  entries: CaseStudyReferencesEntries;
  assets: CaseStudyReferencesAssets;
};

export type CaseStudyReferencesEntries = {
  __typename?: 'CaseStudyReferencesEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type CaseStudyReferencesAssets = {
  __typename?: 'CaseStudyReferencesAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type CaseStudyRelatedItemsCollection = {
  __typename?: 'CaseStudyRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type ServiceUserFacingSupportCollection = {
  __typename?: 'ServiceUserFacingSupportCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type ServiceHelpAndSupport = {
  __typename?: 'ServiceHelpAndSupport';
  json: Scalars['JSON'];
  links: ServiceHelpAndSupportLinks;
};

export type ServiceHelpAndSupportLinks = {
  __typename?: 'ServiceHelpAndSupportLinks';
  entries: ServiceHelpAndSupportEntries;
  assets: ServiceHelpAndSupportAssets;
};

export type ServiceHelpAndSupportEntries = {
  __typename?: 'ServiceHelpAndSupportEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceHelpAndSupportAssets = {
  __typename?: 'ServiceHelpAndSupportAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceDetails = {
  __typename?: 'ServiceDetails';
  json: Scalars['JSON'];
  links: ServiceDetailsLinks;
};

export type ServiceDetailsLinks = {
  __typename?: 'ServiceDetailsLinks';
  entries: ServiceDetailsEntries;
  assets: ServiceDetailsAssets;
};

export type ServiceDetailsEntries = {
  __typename?: 'ServiceDetailsEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceDetailsAssets = {
  __typename?: 'ServiceDetailsAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceFeatures = {
  __typename?: 'ServiceFeatures';
  json: Scalars['JSON'];
  links: ServiceFeaturesLinks;
};

export type ServiceFeaturesLinks = {
  __typename?: 'ServiceFeaturesLinks';
  entries: ServiceFeaturesEntries;
  assets: ServiceFeaturesAssets;
};

export type ServiceFeaturesEntries = {
  __typename?: 'ServiceFeaturesEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceFeaturesAssets = {
  __typename?: 'ServiceFeaturesAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceLimitations = {
  __typename?: 'ServiceLimitations';
  json: Scalars['JSON'];
  links: ServiceLimitationsLinks;
};

export type ServiceLimitationsLinks = {
  __typename?: 'ServiceLimitationsLinks';
  entries: ServiceLimitationsEntries;
  assets: ServiceLimitationsAssets;
};

export type ServiceLimitationsEntries = {
  __typename?: 'ServiceLimitationsEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceLimitationsAssets = {
  __typename?: 'ServiceLimitationsAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceConsiderations = {
  __typename?: 'ServiceConsiderations';
  json: Scalars['JSON'];
  links: ServiceConsiderationsLinks;
};

export type ServiceConsiderationsLinks = {
  __typename?: 'ServiceConsiderationsLinks';
  entries: ServiceConsiderationsEntries;
  assets: ServiceConsiderationsAssets;
};

export type ServiceConsiderationsEntries = {
  __typename?: 'ServiceConsiderationsEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceConsiderationsAssets = {
  __typename?: 'ServiceConsiderationsAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceOfficialDocumentsCollection = {
  __typename?: 'ServiceOfficialDocumentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type ServiceRelatedItemsCollection = {
  __typename?: 'ServiceRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ServiceRelatedItemsItem>>;
};

export type ServiceRelatedItemsItem = Article | CaseStudy | Equipment | Service;

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

export type EquipmentOverview = {
  __typename?: 'EquipmentOverview';
  json: Scalars['JSON'];
  links: EquipmentOverviewLinks;
};

export type EquipmentOverviewLinks = {
  __typename?: 'EquipmentOverviewLinks';
  entries: EquipmentOverviewEntries;
  assets: EquipmentOverviewAssets;
};

export type EquipmentOverviewEntries = {
  __typename?: 'EquipmentOverviewEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentOverviewAssets = {
  __typename?: 'EquipmentOverviewAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentBody = {
  __typename?: 'EquipmentBody';
  json: Scalars['JSON'];
  links: EquipmentBodyLinks;
};

export type EquipmentBodyLinks = {
  __typename?: 'EquipmentBodyLinks';
  entries: EquipmentBodyEntries;
  assets: EquipmentBodyAssets;
};

export type EquipmentBodyEntries = {
  __typename?: 'EquipmentBodyEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentBodyAssets = {
  __typename?: 'EquipmentBodyAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentUserFacingSupportCollection = {
  __typename?: 'EquipmentUserFacingSupportCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type EquipmentEquipmentOwnerCollection = {
  __typename?: 'EquipmentEquipmentOwnerCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type EquipmentEligibility = {
  __typename?: 'EquipmentEligibility';
  json: Scalars['JSON'];
  links: EquipmentEligibilityLinks;
};

export type EquipmentEligibilityLinks = {
  __typename?: 'EquipmentEligibilityLinks';
  entries: EquipmentEligibilityEntries;
  assets: EquipmentEligibilityAssets;
};

export type EquipmentEligibilityEntries = {
  __typename?: 'EquipmentEligibilityEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentEligibilityAssets = {
  __typename?: 'EquipmentEligibilityAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentCostToUse = {
  __typename?: 'EquipmentCostToUse';
  json: Scalars['JSON'];
  links: EquipmentCostToUseLinks;
};

export type EquipmentCostToUseLinks = {
  __typename?: 'EquipmentCostToUseLinks';
  entries: EquipmentCostToUseEntries;
  assets: EquipmentCostToUseAssets;
};

export type EquipmentCostToUseEntries = {
  __typename?: 'EquipmentCostToUseEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentCostToUseAssets = {
  __typename?: 'EquipmentCostToUseAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentTrainingRequired = {
  __typename?: 'EquipmentTrainingRequired';
  json: Scalars['JSON'];
  links: EquipmentTrainingRequiredLinks;
};

export type EquipmentTrainingRequiredLinks = {
  __typename?: 'EquipmentTrainingRequiredLinks';
  entries: EquipmentTrainingRequiredEntries;
  assets: EquipmentTrainingRequiredAssets;
};

export type EquipmentTrainingRequiredEntries = {
  __typename?: 'EquipmentTrainingRequiredEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentTrainingRequiredAssets = {
  __typename?: 'EquipmentTrainingRequiredAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentTrainingProvided = {
  __typename?: 'EquipmentTrainingProvided';
  json: Scalars['JSON'];
  links: EquipmentTrainingProvidedLinks;
};

export type EquipmentTrainingProvidedLinks = {
  __typename?: 'EquipmentTrainingProvidedLinks';
  entries: EquipmentTrainingProvidedEntries;
  assets: EquipmentTrainingProvidedAssets;
};

export type EquipmentTrainingProvidedEntries = {
  __typename?: 'EquipmentTrainingProvidedEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentTrainingProvidedAssets = {
  __typename?: 'EquipmentTrainingProvidedAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentAccess = {
  __typename?: 'EquipmentAccess';
  json: Scalars['JSON'];
  links: EquipmentAccessLinks;
};

export type EquipmentAccessLinks = {
  __typename?: 'EquipmentAccessLinks';
  entries: EquipmentAccessEntries;
  assets: EquipmentAccessAssets;
};

export type EquipmentAccessEntries = {
  __typename?: 'EquipmentAccessEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentAccessAssets = {
  __typename?: 'EquipmentAccessAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentHelpAndSupport = {
  __typename?: 'EquipmentHelpAndSupport';
  json: Scalars['JSON'];
  links: EquipmentHelpAndSupportLinks;
};

export type EquipmentHelpAndSupportLinks = {
  __typename?: 'EquipmentHelpAndSupportLinks';
  entries: EquipmentHelpAndSupportEntries;
  assets: EquipmentHelpAndSupportAssets;
};

export type EquipmentHelpAndSupportEntries = {
  __typename?: 'EquipmentHelpAndSupportEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentHelpAndSupportAssets = {
  __typename?: 'EquipmentHelpAndSupportAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentFeatures = {
  __typename?: 'EquipmentFeatures';
  json: Scalars['JSON'];
  links: EquipmentFeaturesLinks;
};

export type EquipmentFeaturesLinks = {
  __typename?: 'EquipmentFeaturesLinks';
  entries: EquipmentFeaturesEntries;
  assets: EquipmentFeaturesAssets;
};

export type EquipmentFeaturesEntries = {
  __typename?: 'EquipmentFeaturesEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentFeaturesAssets = {
  __typename?: 'EquipmentFeaturesAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentLimitations = {
  __typename?: 'EquipmentLimitations';
  json: Scalars['JSON'];
  links: EquipmentLimitationsLinks;
};

export type EquipmentLimitationsLinks = {
  __typename?: 'EquipmentLimitationsLinks';
  entries: EquipmentLimitationsEntries;
  assets: EquipmentLimitationsAssets;
};

export type EquipmentLimitationsEntries = {
  __typename?: 'EquipmentLimitationsEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentLimitationsAssets = {
  __typename?: 'EquipmentLimitationsAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentConsiderations = {
  __typename?: 'EquipmentConsiderations';
  json: Scalars['JSON'];
  links: EquipmentConsiderationsLinks;
};

export type EquipmentConsiderationsLinks = {
  __typename?: 'EquipmentConsiderationsLinks';
  entries: EquipmentConsiderationsEntries;
  assets: EquipmentConsiderationsAssets;
};

export type EquipmentConsiderationsEntries = {
  __typename?: 'EquipmentConsiderationsEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentConsiderationsAssets = {
  __typename?: 'EquipmentConsiderationsAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentRelatedItemsCollection = {
  __typename?: 'EquipmentRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EquipmentRelatedItemsItem>>;
};

export type EquipmentRelatedItemsItem = Article | CaseStudy | Equipment | Service;

export type ArticleBody = {
  __typename?: 'ArticleBody';
  json: Scalars['JSON'];
  links: ArticleBodyLinks;
};

export type ArticleBodyLinks = {
  __typename?: 'ArticleBodyLinks';
  entries: ArticleBodyEntries;
  assets: ArticleBodyAssets;
};

export type ArticleBodyEntries = {
  __typename?: 'ArticleBodyEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ArticleBodyAssets = {
  __typename?: 'ArticleBodyAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ArticleRelatedItemsCollection = {
  __typename?: 'ArticleRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type ArticleOfficialDocumentsCollection = {
  __typename?: 'ArticleOfficialDocumentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type ArticleRelatedContactsCollection = {
  __typename?: 'ArticleRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type ArticleRelatedOrganisationsCollection = {
  __typename?: 'ArticleRelatedOrganisationsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type SubHubExternalSubHubPage = Article | CaseStudy | Equipment | Service | SubHub;

export type SubHubRelatedItemsCollection = {
  __typename?: 'SubHubRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubRelatedItemsItem>>;
};

export type SubHubRelatedItemsItem = Article | CaseStudy | Equipment | OfficialDocuments | Service | SubHub;

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Article>>;
};

export type PersonCollection = {
  __typename?: 'PersonCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type AssetFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  description_exists: Maybe<Scalars['Boolean']>;
  description: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  url_exists: Maybe<Scalars['Boolean']>;
  url: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  size_exists: Maybe<Scalars['Boolean']>;
  size: Maybe<Scalars['Int']>;
  size_not: Maybe<Scalars['Int']>;
  size_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_not_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_gt: Maybe<Scalars['Int']>;
  size_gte: Maybe<Scalars['Int']>;
  size_lt: Maybe<Scalars['Int']>;
  size_lte: Maybe<Scalars['Int']>;
  contentType_exists: Maybe<Scalars['Boolean']>;
  contentType: Maybe<Scalars['String']>;
  contentType_not: Maybe<Scalars['String']>;
  contentType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_contains: Maybe<Scalars['String']>;
  contentType_not_contains: Maybe<Scalars['String']>;
  fileName_exists: Maybe<Scalars['Boolean']>;
  fileName: Maybe<Scalars['String']>;
  fileName_not: Maybe<Scalars['String']>;
  fileName_in: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_contains: Maybe<Scalars['String']>;
  fileName_not_contains: Maybe<Scalars['String']>;
  width_exists: Maybe<Scalars['Boolean']>;
  width: Maybe<Scalars['Int']>;
  width_not: Maybe<Scalars['Int']>;
  width_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_not_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_gt: Maybe<Scalars['Int']>;
  width_gte: Maybe<Scalars['Int']>;
  width_lt: Maybe<Scalars['Int']>;
  width_lte: Maybe<Scalars['Int']>;
  height_exists: Maybe<Scalars['Boolean']>;
  height: Maybe<Scalars['Int']>;
  height_not: Maybe<Scalars['Int']>;
  height_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_not_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_gt: Maybe<Scalars['Int']>;
  height_gte: Maybe<Scalars['Int']>;
  height_lt: Maybe<Scalars['Int']>;
  height_lte: Maybe<Scalars['Int']>;
  OR: Maybe<Array<Maybe<AssetFilter>>>;
  AND: Maybe<Array<Maybe<AssetFilter>>>;
};

export type SysFilter = {
  id_exists: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['String']>;
  id_not: Maybe<Scalars['String']>;
  id_in: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains: Maybe<Scalars['String']>;
  id_not_contains: Maybe<Scalars['String']>;
  publishedAt_exists: Maybe<Scalars['Boolean']>;
  publishedAt: Maybe<Scalars['String']>;
  publishedAt_not: Maybe<Scalars['String']>;
  publishedAt_in: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_contains: Maybe<Scalars['String']>;
  publishedAt_not_contains: Maybe<Scalars['String']>;
  firstPublishedAt_exists: Maybe<Scalars['Boolean']>;
  firstPublishedAt: Maybe<Scalars['String']>;
  firstPublishedAt_not: Maybe<Scalars['String']>;
  firstPublishedAt_in: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_contains: Maybe<Scalars['String']>;
  firstPublishedAt_not_contains: Maybe<Scalars['String']>;
  publishedVersion_exists: Maybe<Scalars['Boolean']>;
  publishedVersion: Maybe<Scalars['String']>;
  publishedVersion_not: Maybe<Scalars['String']>;
  publishedVersion_in: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_contains: Maybe<Scalars['String']>;
  publishedVersion_not_contains: Maybe<Scalars['String']>;
};

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testContentType) */
export type TestContentType = Entry & {
  __typename?: 'TestContentType';
  sys: Sys;
  linkedFrom: Maybe<TestContentTypeLinkingCollections>;
  shortTxt: Maybe<Scalars['String']>;
  view: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testContentType) */
export type TestContentTypeLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testContentType) */
export type TestContentTypeShortTxtArgs = {
  locale: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testContentType) */
export type TestContentTypeViewArgs = {
  locale: Maybe<Scalars['String']>;
};

export type TestContentTypeLinkingCollections = {
  __typename?: 'TestContentTypeLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type TestContentTypeLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type TestContentTypeFilter = {
  sys: Maybe<SysFilter>;
  shortTxt_exists: Maybe<Scalars['Boolean']>;
  shortTxt: Maybe<Scalars['String']>;
  shortTxt_not: Maybe<Scalars['String']>;
  shortTxt_in: Maybe<Array<Maybe<Scalars['String']>>>;
  shortTxt_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  shortTxt_contains: Maybe<Scalars['String']>;
  shortTxt_not_contains: Maybe<Scalars['String']>;
  view_exists: Maybe<Scalars['Boolean']>;
  view: Maybe<Scalars['String']>;
  view_not: Maybe<Scalars['String']>;
  view_in: Maybe<Array<Maybe<Scalars['String']>>>;
  view_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  view_contains: Maybe<Scalars['String']>;
  view_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<TestContentTypeFilter>>>;
  AND: Maybe<Array<Maybe<TestContentTypeFilter>>>;
};

export enum TestContentTypeOrder {
  ShortTxtAsc = 'shortTxt_ASC',
  ShortTxtDesc = 'shortTxt_DESC',
  ViewAsc = 'view_ASC',
  ViewDesc = 'view_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type TestContentTypeCollection = {
  __typename?: 'TestContentTypeCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<TestContentType>>;
};

export type SubHubFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<SubHubFilter>>>;
  AND: Maybe<Array<Maybe<SubHubFilter>>>;
};

export enum SubHubOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ArticleFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  displayBanner_exists: Maybe<Scalars['Boolean']>;
  displayBanner: Maybe<Scalars['Boolean']>;
  displayBanner_not: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<ArticleFilter>>>;
  AND: Maybe<Array<Maybe<ArticleFilter>>>;
};

export enum ArticleOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  DisplayBannerAsc = 'displayBanner_ASC',
  DisplayBannerDesc = 'displayBanner_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type EquipmentFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  type_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  type_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  type_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer_exists: Maybe<Scalars['Boolean']>;
  manufacturer: Maybe<Scalars['String']>;
  manufacturer_not: Maybe<Scalars['String']>;
  manufacturer_in: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer_contains: Maybe<Scalars['String']>;
  manufacturer_not_contains: Maybe<Scalars['String']>;
  model_exists: Maybe<Scalars['Boolean']>;
  model: Maybe<Scalars['String']>;
  model_not: Maybe<Scalars['String']>;
  model_in: Maybe<Array<Maybe<Scalars['String']>>>;
  model_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  model_contains: Maybe<Scalars['String']>;
  model_not_contains: Maybe<Scalars['String']>;
  location_exists: Maybe<Scalars['Boolean']>;
  location: Maybe<Scalars['String']>;
  location_not: Maybe<Scalars['String']>;
  location_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  yearOfManufacture_exists: Maybe<Scalars['Boolean']>;
  yearOfManufacture: Maybe<Scalars['Int']>;
  yearOfManufacture_not: Maybe<Scalars['Int']>;
  yearOfManufacture_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  yearOfManufacture_not_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  yearOfManufacture_gt: Maybe<Scalars['Int']>;
  yearOfManufacture_gte: Maybe<Scalars['Int']>;
  yearOfManufacture_lt: Maybe<Scalars['Int']>;
  yearOfManufacture_lte: Maybe<Scalars['Int']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<EquipmentFilter>>>;
  AND: Maybe<Array<Maybe<EquipmentFilter>>>;
};

export enum EquipmentOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  ManufacturerAsc = 'manufacturer_ASC',
  ManufacturerDesc = 'manufacturer_DESC',
  ModelAsc = 'model_ASC',
  ModelDesc = 'model_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  YearOfManufactureAsc = 'yearOfManufacture_ASC',
  YearOfManufactureDesc = 'yearOfManufacture_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testing) */
export type Testing = Entry & {
  __typename?: 'Testing';
  sys: Sys;
  linkedFrom: Maybe<TestingLinkingCollections>;
};


/** [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/testing) */
export type TestingLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TestingLinkingCollections = {
  __typename?: 'TestingLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type TestingLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type TestingFilter = {
  sys: Maybe<SysFilter>;
  OR: Maybe<Array<Maybe<TestingFilter>>>;
  AND: Maybe<Array<Maybe<TestingFilter>>>;
};

export enum TestingOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type TestingCollection = {
  __typename?: 'TestingCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Testing>>;
};

export type OfficialDocumentsFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  url_exists: Maybe<Scalars['Boolean']>;
  url: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<OfficialDocumentsFilter>>>;
  AND: Maybe<Array<Maybe<OfficialDocumentsFilter>>>;
};

export enum OfficialDocumentsOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ServiceFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  overview_exists: Maybe<Scalars['Boolean']>;
  overview: Maybe<Scalars['String']>;
  overview_not: Maybe<Scalars['String']>;
  overview_in: Maybe<Array<Maybe<Scalars['String']>>>;
  overview_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  overview_contains: Maybe<Scalars['String']>;
  overview_not_contains: Maybe<Scalars['String']>;
  eligibility_exists: Maybe<Scalars['Boolean']>;
  eligibility: Maybe<Scalars['String']>;
  eligibility_not: Maybe<Scalars['String']>;
  eligibility_in: Maybe<Array<Maybe<Scalars['String']>>>;
  eligibility_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  eligibility_contains: Maybe<Scalars['String']>;
  eligibility_not_contains: Maybe<Scalars['String']>;
  cost_exists: Maybe<Scalars['Boolean']>;
  cost: Maybe<Scalars['String']>;
  cost_not: Maybe<Scalars['String']>;
  cost_in: Maybe<Array<Maybe<Scalars['String']>>>;
  cost_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  cost_contains: Maybe<Scalars['String']>;
  cost_not_contains: Maybe<Scalars['String']>;
  access_exists: Maybe<Scalars['Boolean']>;
  access: Maybe<Scalars['String']>;
  access_not: Maybe<Scalars['String']>;
  access_in: Maybe<Array<Maybe<Scalars['String']>>>;
  access_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  access_contains: Maybe<Scalars['String']>;
  access_not_contains: Maybe<Scalars['String']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  OR: Maybe<Array<Maybe<ServiceFilter>>>;
  AND: Maybe<Array<Maybe<ServiceFilter>>>;
};

export enum ServiceOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CaseStudyFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  callToActionButtonText_exists: Maybe<Scalars['Boolean']>;
  callToActionButtonText: Maybe<Scalars['String']>;
  callToActionButtonText_not: Maybe<Scalars['String']>;
  callToActionButtonText_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonText_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonText_contains: Maybe<Scalars['String']>;
  callToActionButtonText_not_contains: Maybe<Scalars['String']>;
  callToActionButtonLink_exists: Maybe<Scalars['Boolean']>;
  callToActionButtonLink: Maybe<Scalars['String']>;
  callToActionButtonLink_not: Maybe<Scalars['String']>;
  callToActionButtonLink_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionButtonLink_contains: Maybe<Scalars['String']>;
  callToActionButtonLink_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<CaseStudyFilter>>>;
  AND: Maybe<Array<Maybe<CaseStudyFilter>>>;
};

export enum CaseStudyOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  CallToActionButtonTextAsc = 'callToActionButtonText_ASC',
  CallToActionButtonTextDesc = 'callToActionButtonText_DESC',
  CallToActionButtonLinkAsc = 'callToActionButtonLink_ASC',
  CallToActionButtonLinkDesc = 'callToActionButtonLink_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PersonFilter = {
  sys: Maybe<SysFilter>;
  username_exists: Maybe<Scalars['Boolean']>;
  username: Maybe<Scalars['String']>;
  username_not: Maybe<Scalars['String']>;
  username_in: Maybe<Array<Maybe<Scalars['String']>>>;
  username_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  username_contains: Maybe<Scalars['String']>;
  username_not_contains: Maybe<Scalars['String']>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  jobTitle_exists: Maybe<Scalars['Boolean']>;
  jobTitle: Maybe<Scalars['String']>;
  jobTitle_not: Maybe<Scalars['String']>;
  jobTitle_in: Maybe<Array<Maybe<Scalars['String']>>>;
  jobTitle_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  jobTitle_contains: Maybe<Scalars['String']>;
  jobTitle_not_contains: Maybe<Scalars['String']>;
  slug_exists: Maybe<Scalars['Boolean']>;
  slug: Maybe<Scalars['String']>;
  slug_not: Maybe<Scalars['String']>;
  slug_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains: Maybe<Scalars['String']>;
  slug_not_contains: Maybe<Scalars['String']>;
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<PersonFilter>>>;
  AND: Maybe<Array<Maybe<PersonFilter>>>;
};

export enum PersonOrder {
  UsernameAsc = 'username_ASC',
  UsernameDesc = 'username_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

type PublicFields_SubHub_Fragment = { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Article_Fragment = { __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }> };

type PublicFields_Equipment_Fragment = { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Service_Fragment = { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Person_Fragment = { __typename: 'Person', slug: Maybe<string>, name: Maybe<string>, searchable: Maybe<boolean>, ssoProtected: Maybe<boolean> };

type PublicFields_OfficialDocuments_Fragment = { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> };

type PublicFields_CaseStudy_Fragment = { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_TestContentType_Fragment = { __typename?: 'TestContentType' };

type PublicFields_Testing_Fragment = { __typename?: 'Testing' };

export type PublicFieldsFragment = PublicFields_SubHub_Fragment | PublicFields_Article_Fragment | PublicFields_Equipment_Fragment | PublicFields_Service_Fragment | PublicFields_Person_Fragment | PublicFields_OfficialDocuments_Fragment | PublicFields_CaseStudy_Fragment | PublicFields_TestContentType_Fragment | PublicFields_Testing_Fragment;

export type AllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllArticlesQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<(
      { __typename?: 'Article' }
      & PublicFields_Article_Fragment
    )>> }> };

export type AllContentItemParentSubHubsQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type AllContentItemParentSubHubsQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, ssoProtected: Maybe<boolean>, linkedFrom: Maybe<{ __typename?: 'SubHubLinkingCollections', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string> }>> }> }> }>> }> };

export type AllEquipmentQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEquipmentQuery = { __typename?: 'Query', equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<(
      { __typename?: 'Equipment' }
      & PublicFields_Equipment_Fragment
    )>> }> };

export type AllSearchableContentPublicFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSearchableContentPublicFieldsQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<(
      { __typename?: 'Article' }
      & PublicFields_Article_Fragment
    )>> }>, equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<(
      { __typename?: 'Equipment' }
      & PublicFields_Equipment_Fragment
    )>> }>, serviceCollection: Maybe<{ __typename?: 'ServiceCollection', items: Array<Maybe<(
      { __typename?: 'Service' }
      & PublicFields_Service_Fragment
    )>> }>, subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<(
      { __typename?: 'SubHub' }
      & PublicFields_SubHub_Fragment
    )>> }>, caseStudyCollection: Maybe<{ __typename?: 'CaseStudyCollection', items: Array<Maybe<(
      { __typename?: 'CaseStudy' }
      & PublicFields_CaseStudy_Fragment
    )>> }> };

export type GetAllSubHubChildPagesSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSubHubChildPagesSlugsQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, subhubPagesCollection: Maybe<{ __typename?: 'SubHubSubhubPagesCollection', items: Array<Maybe<{ __typename?: 'Article', slug: Maybe<string> } | { __typename?: 'CaseStudy' } | { __typename?: 'Equipment', slug: Maybe<string> } | { __typename?: 'OfficialDocuments' } | { __typename?: 'Service', slug: Maybe<string> } | { __typename?: 'SubHub', slug: Maybe<string> }>> }> }>> }> };

export type AllSubHubChildPagesQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type AllSubHubChildPagesQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, viewType: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, sys: { __typename?: 'Sys', id: string }, body: Maybe<{ __typename?: 'SubHubBody', json: any }>, subhubPagesCollection: Maybe<{ __typename?: 'SubHubSubhubPagesCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }> }>> }> };

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArticleByIdQuery = { __typename?: 'Query', article: Maybe<{ __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, viewType: Maybe<string>, displayBanner: Maybe<boolean>, keywords: Maybe<Array<Maybe<string>>>, slug: Maybe<string>, searchable: Maybe<boolean>, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, url: Maybe<string>, description: Maybe<string> }>, body: Maybe<{ __typename?: 'ArticleBody', json: any, links: { __typename?: 'ArticleBodyLinks', entries: { __typename?: 'ArticleBodyEntries', block: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>>, inline: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>>, hyperlink: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }, assets: { __typename?: 'ArticleBodyAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, relatedContactsCollection: Maybe<{ __typename?: 'ArticleRelatedContactsCollection', items: Array<Maybe<{ __typename?: 'SubHub' } | { __typename?: 'Article' } | { __typename?: 'Equipment' } | { __typename?: 'Service' } | { __typename?: 'Person', name: Maybe<string>, title: Maybe<string>, jobTitle: Maybe<string>, image: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> } | { __typename?: 'OfficialDocuments' } | { __typename?: 'CaseStudy' } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }>, relatedItemsCollection: Maybe<{ __typename?: 'ArticleRelatedItemsCollection', items: Array<Maybe<{ __typename?: 'SubHub' } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Person' } | { __typename?: 'OfficialDocuments' } | { __typename?: 'CaseStudy' } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }>, officialDocumentsCollection: Maybe<{ __typename?: 'ArticleOfficialDocumentsCollection', items: Array<Maybe<{ __typename?: 'SubHub' } | { __typename?: 'Article' } | { __typename?: 'Equipment' } | { __typename?: 'Service' } | { __typename?: 'Person' } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string> } | { __typename?: 'CaseStudy' } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }>, relatedOrganisationsCollection: Maybe<{ __typename?: 'ArticleRelatedOrganisationsCollection', items: Array<Maybe<{ __typename?: 'SubHub' } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Person' } | { __typename?: 'OfficialDocuments' } | { __typename?: 'CaseStudy' } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }> }> };

export type GetArticleBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetArticleBySlugQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<{ __typename?: 'Article', ssoProtected: Maybe<boolean>, sys: { __typename?: 'Sys', id: string } }>> }> };

export type GetEquipmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEquipmentByIdQuery = { __typename?: 'Query', equipment: Maybe<{ __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, viewType: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, slug: Maybe<string>, searchable: Maybe<boolean>, type: Maybe<Array<Maybe<string>>>, manufacturer: Maybe<string>, model: Maybe<string>, location: Maybe<string>, yearOfManufacture: Maybe<number>, body: Maybe<{ __typename?: 'EquipmentBody', json: any, links: { __typename?: 'EquipmentBodyLinks', entries: { __typename?: 'EquipmentBodyEntries', block: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>>, inline: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>>, hyperlink: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'Person', name: Maybe<string>, jobTitle: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'CaseStudy', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string>, sys: { __typename?: 'Sys', id: string } } | { __typename?: 'TestContentType' } | { __typename?: 'Testing' }>> }, assets: { __typename?: 'EquipmentBodyAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, overview: Maybe<{ __typename?: 'EquipmentOverview', json: any }>, userFacingSupportCollection: Maybe<{ __typename?: 'EquipmentUserFacingSupportCollection', items: Array<Maybe<{ __typename?: 'Person', name: Maybe<string>, title: Maybe<string>, jobTitle: Maybe<string>, image: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> }>> }>, equipmentOwnerCollection: Maybe<{ __typename?: 'EquipmentEquipmentOwnerCollection', items: Array<Maybe<{ __typename?: 'Person', name: Maybe<string>, title: Maybe<string>, jobTitle: Maybe<string>, image: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> }>> }>, mainImage: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, features: Maybe<{ __typename?: 'EquipmentFeatures', json: any }>, limitations: Maybe<{ __typename?: 'EquipmentLimitations', json: any }>, eligibility: Maybe<{ __typename?: 'EquipmentEligibility', json: any }>, costToUse: Maybe<{ __typename?: 'EquipmentCostToUse', json: any }>, trainingRequired: Maybe<{ __typename?: 'EquipmentTrainingRequired', json: any }>, trainingProvided: Maybe<{ __typename?: 'EquipmentTrainingProvided', json: any }>, access: Maybe<{ __typename?: 'EquipmentAccess', json: any }>, helpAndSupport: Maybe<{ __typename?: 'EquipmentHelpAndSupport', json: any }>, considerations: Maybe<{ __typename?: 'EquipmentConsiderations', json: any }>, relatedItemsCollection: Maybe<{ __typename?: 'EquipmentRelatedItemsCollection', items: Array<Maybe<{ __typename?: 'Article', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'CaseStudy' } | { __typename?: 'Equipment', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> } | { __typename?: 'Service', title: Maybe<string>, summary: Maybe<string>, slug: Maybe<string> }>> }> }> };

export type GetEquipmentBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetEquipmentBySlugQuery = { __typename?: 'Query', equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<{ __typename?: 'Equipment', title: Maybe<string>, ssoProtected: Maybe<boolean>, sys: { __typename?: 'Sys', id: string } }>> }> };

export type SubHubChildPagesByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubHubChildPagesByIdQuery = { __typename?: 'Query', subHub: Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, viewType: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, keywords: Maybe<Array<Maybe<string>>>, bannerImage: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, body: Maybe<{ __typename?: 'SubHubBody', json: any }>, subhubPagesCollection: Maybe<{ __typename?: 'SubHubSubhubPagesCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string>, bannerImage: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> }>> }>, relatedItemsCollection: Maybe<{ __typename?: 'SubHubRelatedItemsCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }> }> };

export const PublicFieldsFragmentDoc = gql`
    fragment PublicFields on Entry {
  ... on Article {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
    icon {
      title
      description
      url
    }
  }
  ... on Equipment {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Service {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on SubHub {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on CaseStudy {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Person {
    __typename
    slug
    name
    searchable
    ssoProtected
  }
  ... on OfficialDocuments {
    __typename
    title
    summary
  }
}
    `;
export const AllArticlesDocument = gql`
    query AllArticles {
  articleCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllArticlesGQL extends Apollo.Query<AllArticlesQuery, AllArticlesQueryVariables> {
    document = AllArticlesDocument;
    
  }
export const AllContentItemParentSubHubsDocument = gql`
    query AllContentItemParentSubHubs($slug: String) {
  subHubCollection(where: {slug: $slug}) {
    items {
      title
      ssoProtected
      linkedFrom {
        subHubCollection {
          items {
            slug
            title
            summary
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllContentItemParentSubHubsGQL extends Apollo.Query<AllContentItemParentSubHubsQuery, AllContentItemParentSubHubsQueryVariables> {
    document = AllContentItemParentSubHubsDocument;
    
  }
export const AllEquipmentDocument = gql`
    query AllEquipment {
  equipmentCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllEquipmentGQL extends Apollo.Query<AllEquipmentQuery, AllEquipmentQueryVariables> {
    document = AllEquipmentDocument;
    
  }
export const AllSearchableContentPublicFieldsDocument = gql`
    query AllSearchableContentPublicFields {
  articleCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  equipmentCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  serviceCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  subHubCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  caseStudyCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSearchableContentPublicFieldsGQL extends Apollo.Query<AllSearchableContentPublicFieldsQuery, AllSearchableContentPublicFieldsQueryVariables> {
    document = AllSearchableContentPublicFieldsDocument;
    
  }
export const GetAllSubHubChildPagesSlugsDocument = gql`
    query GetAllSubHubChildPagesSlugs {
  subHubCollection {
    items {
      slug
      title
      subhubPagesCollection {
        items {
          ... on Article {
            slug
          }
          ... on Equipment {
            slug
          }
          ... on Service {
            slug
          }
          ... on SubHub {
            slug
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSubHubChildPagesSlugsGQL extends Apollo.Query<GetAllSubHubChildPagesSlugsQuery, GetAllSubHubChildPagesSlugsQueryVariables> {
    document = GetAllSubHubChildPagesSlugsDocument;
    
  }
export const AllSubHubChildPagesDocument = gql`
    query AllSubHubChildPages($slug: String) {
  subHubCollection(where: {slug: $slug}) {
    items {
      sys {
        id
      }
      slug
      title
      viewType
      summary
      body {
        json
      }
      ssoProtected
      searchable
      subhubPagesCollection {
        items {
          ... on Article {
            __typename
            slug
            title
            ssoProtected
            summary
          }
          ... on CaseStudy {
            __typename
            slug
            title
            ssoProtected
            summary
          }
          ... on Equipment {
            __typename
            slug
            title
            ssoProtected
            summary
          }
          ... on OfficialDocuments {
            __typename
            title
            summary
          }
          ... on Service {
            __typename
            slug
            title
            ssoProtected
            summary
          }
          ... on SubHub {
            __typename
            slug
            title
            ssoProtected
            summary
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSubHubChildPagesGQL extends Apollo.Query<AllSubHubChildPagesQuery, AllSubHubChildPagesQueryVariables> {
    document = AllSubHubChildPagesDocument;
    
  }
export const GetArticleByIdDocument = gql`
    query GetArticleByID($id: String!) {
  article(id: $id) {
    title
    summary
    ssoProtected
    viewType
    banner {
      title
      url
      description
    }
    displayBanner
    body {
      json
      links {
        entries {
          block {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
          inline {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
          hyperlink {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
        }
        assets {
          block {
            title
            description
            url
          }
        }
      }
    }
    keywords
    slug
    ssoProtected
    searchable
    icon {
      title
      description
      url
    }
    relatedContactsCollection {
      items {
        ... on Person {
          name
          title
          jobTitle
          image {
            url
          }
        }
      }
    }
    relatedItemsCollection {
      items {
        ... on Article {
          title
          summary
          slug
        }
        ... on Service {
          title
          summary
          slug
        }
        ... on Equipment {
          title
          summary
          slug
        }
      }
    }
    officialDocumentsCollection {
      items {
        ... on OfficialDocuments {
          title
          summary
          url
        }
      }
    }
    relatedOrganisationsCollection {
      items {
        ... on Article {
          title
          summary
          slug
        }
        ... on Service {
          title
          summary
          slug
        }
        ... on Equipment {
          title
          summary
          slug
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleByIdGQL extends Apollo.Query<GetArticleByIdQuery, GetArticleByIdQueryVariables> {
    document = GetArticleByIdDocument;
    
  }
export const GetArticleBySlugDocument = gql`
    query GetArticleBySlug($slug: String) {
  articleCollection(where: {slug: $slug}) {
    items {
      ssoProtected
      sys {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleBySlugGQL extends Apollo.Query<GetArticleBySlugQuery, GetArticleBySlugQueryVariables> {
    document = GetArticleBySlugDocument;
    
  }
export const GetEquipmentByIdDocument = gql`
    query GetEquipmentByID($id: String!) {
  equipment(id: $id) {
    title
    summary
    ssoProtected
    viewType
    body {
      json
      links {
        entries {
          block {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
          inline {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
          hyperlink {
            ... on Article {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Service {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on Equipment {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on SubHub {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on CaseStudy {
              sys {
                id
              }
              title
              summary
              slug
            }
            ... on OfficialDocuments {
              sys {
                id
              }
              title
              summary
              url
            }
            ... on Person {
              sys {
                id
              }
              name
              jobTitle
            }
          }
        }
        assets {
          block {
            title
            description
            url
          }
        }
      }
    }
    keywords
    slug
    ssoProtected
    searchable
    overview {
      json
    }
    userFacingSupportCollection {
      items {
        ... on Person {
          name
          title
          jobTitle
          image {
            url
          }
        }
      }
    }
    equipmentOwnerCollection {
      items {
        ... on Person {
          name
          title
          jobTitle
          image {
            url
          }
        }
      }
    }
    mainImage {
      url
    }
    icon {
      title
      description
      url
    }
    features {
      json
    }
    limitations {
      json
    }
    type
    manufacturer
    model
    eligibility {
      json
    }
    costToUse {
      json
    }
    location
    trainingRequired {
      json
    }
    trainingProvided {
      json
    }
    yearOfManufacture
    access {
      json
    }
    helpAndSupport {
      json
    }
    considerations {
      json
    }
    relatedItemsCollection {
      items {
        ... on Article {
          title
          summary
          slug
        }
        ... on Service {
          title
          summary
          slug
        }
        ... on Equipment {
          title
          summary
          slug
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentByIdGQL extends Apollo.Query<GetEquipmentByIdQuery, GetEquipmentByIdQueryVariables> {
    document = GetEquipmentByIdDocument;
    
  }
export const GetEquipmentBySlugDocument = gql`
    query GetEquipmentBySlug($slug: String) {
  equipmentCollection(where: {slug: $slug}) {
    items {
      title
      ssoProtected
      sys {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentBySlugGQL extends Apollo.Query<GetEquipmentBySlugQuery, GetEquipmentBySlugQueryVariables> {
    document = GetEquipmentBySlugDocument;
    
  }
export const SubHubChildPagesByIdDocument = gql`
    query SubHubChildPagesById($id: String!) {
  subHub(id: $id) {
    slug
    title
    viewType
    summary
    bannerImage {
      url
    }
    body {
      json
    }
    ssoProtected
    searchable
    keywords
    subhubPagesCollection {
      items {
        ... on Article {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on CaseStudy {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Equipment {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on OfficialDocuments {
          __typename
          title
          summary
        }
        ... on Service {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on SubHub {
          __typename
          slug
          title
          ssoProtected
          summary
          bannerImage {
            url
          }
        }
      }
    }
    relatedItemsCollection {
      items {
        ... on Article {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on CaseStudy {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Equipment {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on OfficialDocuments {
          __typename
          title
          summary
        }
        ... on Service {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on SubHub {
          __typename
          slug
          title
          ssoProtected
          summary
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubHubChildPagesByIdGQL extends Apollo.Query<SubHubChildPagesByIdQuery, SubHubChildPagesByIdQueryVariables> {
    document = SubHubChildPagesByIdDocument;
    
  }
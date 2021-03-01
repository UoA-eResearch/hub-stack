import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /** The Circle scalar type represents a circle, defined by the coordinates of its center and a radius. The Circle type is used to represent a searchable area together with the '_within_circle' filter. */
  Circle: any;
  /** The Rectangle scalar type represents a rectangle, defined by the coordinates of its top left and bottom right corners. The Rectangle type is used to represent a searchable area together with the '_within_rectangle' filter. */
  Rectangle: any;
};



export type Query = {
  __typename?: 'Query';
  asset: Maybe<Asset>;
  assetCollection: Maybe<AssetCollection>;
  fieldTestType: Maybe<FieldTestType>;
  fieldTestTypeCollection: Maybe<FieldTestTypeCollection>;
  event: Maybe<Event>;
  eventCollection: Maybe<EventCollection>;
  person: Maybe<Person>;
  personCollection: Maybe<PersonCollection>;
  subHub: Maybe<SubHub>;
  subHubCollection: Maybe<SubHubCollection>;
  software: Maybe<Software>;
  softwareCollection: Maybe<SoftwareCollection>;
  service: Maybe<Service>;
  serviceCollection: Maybe<ServiceCollection>;
  equipment: Maybe<Equipment>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudy: Maybe<CaseStudy>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  article: Maybe<Article>;
  articleCollection: Maybe<ArticleCollection>;
  category: Maybe<Category>;
  categoryCollection: Maybe<CategoryCollection>;
  orgUnit: Maybe<OrgUnit>;
  orgUnitCollection: Maybe<OrgUnitCollection>;
  partFeaturedItem: Maybe<PartFeaturedItem>;
  partFeaturedItemCollection: Maybe<PartFeaturedItemCollection>;
  stage: Maybe<Stage>;
  stageCollection: Maybe<StageCollection>;
  linkCard: Maybe<LinkCard>;
  linkCardCollection: Maybe<LinkCardCollection>;
  officialDocuments: Maybe<OfficialDocuments>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  video: Maybe<Video>;
  videoCollection: Maybe<VideoCollection>;
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


export type QueryFieldTestTypeArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryFieldTestTypeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<FieldTestTypeFilter>;
  order: Maybe<Array<Maybe<FieldTestTypeOrder>>>;
};


export type QueryEventArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<EventFilter>;
  order: Maybe<Array<Maybe<EventOrder>>>;
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


export type QuerySoftwareArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QuerySoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<SoftwareFilter>;
  order: Maybe<Array<Maybe<SoftwareOrder>>>;
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


export type QueryCategoryArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<CategoryFilter>;
  order: Maybe<Array<Maybe<CategoryOrder>>>;
};


export type QueryOrgUnitArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryOrgUnitCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<OrgUnitFilter>;
  order: Maybe<Array<Maybe<OrgUnitOrder>>>;
};


export type QueryPartFeaturedItemArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryPartFeaturedItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<PartFeaturedItemFilter>;
  order: Maybe<Array<Maybe<PartFeaturedItemOrder>>>;
};


export type QueryStageArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<StageFilter>;
  order: Maybe<Array<Maybe<StageOrder>>>;
};


export type QueryLinkCardArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryLinkCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<LinkCardFilter>;
  order: Maybe<Array<Maybe<LinkCardOrder>>>;
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


export type QueryVideoArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryVideoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<VideoFilter>;
  order: Maybe<Array<Maybe<VideoOrder>>>;
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
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
  linkCardCollection: Maybe<LinkCardCollection>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsEventCollectionArgs = {
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


export type AssetLinkingCollectionsSoftwareCollectionArgs = {
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


export type AssetLinkingCollectionsEquipmentCollectionArgs = {
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


export type AssetLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsLinkCardCollectionArgs = {
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

export type EventCollection = {
  __typename?: 'EventCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Event>>;
};

/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type Event = Entry & {
  __typename?: 'Event';
  sys: Sys;
  linkedFrom: Maybe<EventLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  callToAction: Maybe<Scalars['String']>;
  callToActionLabel: Maybe<Scalars['String']>;
  bodyText: Maybe<EventBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  audience: Maybe<Scalars['String']>;
  mode: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
  access: Maybe<Scalars['String']>;
  capabilities: Maybe<Scalars['String']>;
  location: Maybe<EventLocation>;
  address: Maybe<Location>;
  relatedContactsCollection: Maybe<EventRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<EventRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<EventRelatedItemsCollection>;
  relatedDocsCollection: Maybe<EventRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<EventCategoryCollection>;
  stageCollection: Maybe<EventStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventCallToActionLabelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventAudienceArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventModeArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventAvailabilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventDateArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventCapabilitiesArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventAddressArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventPublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of events held within UoA related to research or researcher development [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event) */
export type EventSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EventLinkingCollections = {
  __typename?: 'EventLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type EventLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SubHubCollection = {
  __typename?: 'SubHubCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHub>>;
};

/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHub = Entry & {
  __typename?: 'SubHub';
  sys: Sys;
  linkedFrom: Maybe<SubHubLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  featured: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  viewType: Maybe<Scalars['String']>;
  bodyText: Maybe<SubHubBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  internalPagesCollection: Maybe<SubHubInternalPagesCollection>;
  externalPagesCollection: Maybe<SubHubExternalPagesCollection>;
  relatedContactsCollection: Maybe<SubHubRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<SubHubRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<SubHubRelatedItemsCollection>;
  relatedDocsCollection: Maybe<SubHubRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<SubHubCategoryCollection>;
  stageCollection: Maybe<SubHubStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubFeaturedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubInternalPagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubExternalPagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubPublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Routes to other pages within the Hub, creates an informational hierarchy. See Hub handbook for guidance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub) */
export type SubHubSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SubHubLinkingCollections = {
  __typename?: 'SubHubLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type SubHubLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsEventCollectionArgs = {
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


export type SubHubLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SoftwareCollection = {
  __typename?: 'SoftwareCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Software>>;
};

/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type Software = Entry & {
  __typename?: 'Software';
  sys: Sys;
  linkedFrom: Maybe<SoftwareLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  callToAction: Maybe<Scalars['String']>;
  callToActionLabel: Maybe<Scalars['String']>;
  bodyText: Maybe<SoftwareBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  licencing: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
  access: Maybe<Scalars['String']>;
  limitations: Maybe<Scalars['String']>;
  relatedContactsCollection: Maybe<SoftwareRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<SoftwareRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<SoftwareRelatedItemsCollection>;
  relatedDocsCollection: Maybe<SoftwareRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<SoftwareCategoryCollection>;
  stageCollection: Maybe<SoftwareStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareCallToActionLabelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareLicencingArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareCostArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareLimitationsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwarePublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a piece of software used for research at UoA and a link to access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software) */
export type SoftwareSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SoftwareLinkingCollections = {
  __typename?: 'SoftwareLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type SoftwareLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SoftwareLinkingCollectionsArticleCollectionArgs = {
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

/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type Service = Entry & {
  __typename?: 'Service';
  sys: Sys;
  linkedFrom: Maybe<ServiceLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  callToAction: Maybe<Scalars['String']>;
  callToActionLabel: Maybe<Scalars['String']>;
  bodyText: Maybe<ServiceBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  audience: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
  access: Maybe<Scalars['String']>;
  relatedContactsCollection: Maybe<ServiceRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<ServiceRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<ServiceRelatedItemsCollection>;
  relatedDocsCollection: Maybe<ServiceRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<ServiceCategoryCollection>;
  stageCollection: Maybe<ServiceStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCallToActionLabelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceAudienceArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceAvailabilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCostArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServicePublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ServiceLinkingCollections = {
  __typename?: 'ServiceLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type ServiceLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsEventCollectionArgs = {
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


export type ServiceLinkingCollectionsSoftwareCollectionArgs = {
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


export type ServiceLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsArticleCollectionArgs = {
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

/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type Equipment = Entry & {
  __typename?: 'Equipment';
  sys: Sys;
  linkedFrom: Maybe<EquipmentLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  callToAction: Maybe<Scalars['String']>;
  callToActionLabel: Maybe<Scalars['String']>;
  bodyText: Maybe<EquipmentBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  yearOfManufacture: Maybe<Scalars['Int']>;
  audience: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
  access: Maybe<Scalars['String']>;
  location: Maybe<EquipmentLocation>;
  address: Maybe<Location>;
  relatedContactsCollection: Maybe<EquipmentRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<EquipmentRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<EquipmentRelatedItemsCollection>;
  relatedDocsCollection: Maybe<EquipmentRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<EquipmentCategoryCollection>;
  stageCollection: Maybe<EquipmentStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentCallToActionLabelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentManufacturerArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentModelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentYearOfManufactureArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentAudienceArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentAvailabilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentCostArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentAddressArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentPublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Hardware, research instruments, or physical equipment used to conduct or support research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment) */
export type EquipmentSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EquipmentLinkingCollections = {
  __typename?: 'EquipmentLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type EquipmentLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EquipmentLinkingCollectionsEventCollectionArgs = {
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


export type EquipmentLinkingCollectionsSoftwareCollectionArgs = {
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


export type EquipmentLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Article>>;
};

/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type Article = Entry & {
  __typename?: 'Article';
  sys: Sys;
  linkedFrom: Maybe<ArticleLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  viewType: Maybe<Scalars['String']>;
  callToAction: Maybe<Scalars['String']>;
  callToActionLabel: Maybe<Scalars['String']>;
  bodyText: Maybe<ArticleBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection: Maybe<ArticleRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<ArticleRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<ArticleRelatedItemsCollection>;
  relatedDocsCollection: Maybe<ArticleRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<ArticleCategoryCollection>;
  stageCollection: Maybe<ArticleStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleCallToActionLabelArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticlePublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleSupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type ArticleLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsEventCollectionArgs = {
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


export type ArticleLinkingCollectionsSoftwareCollectionArgs = {
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


export type ArticleLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ArticleBodyText = {
  __typename?: 'ArticleBodyText';
  json: Scalars['JSON'];
  links: ArticleBodyTextLinks;
};


export type ArticleBodyTextLinks = {
  __typename?: 'ArticleBodyTextLinks';
  entries: ArticleBodyTextEntries;
  assets: ArticleBodyTextAssets;
};

export type ArticleBodyTextEntries = {
  __typename?: 'ArticleBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ArticleBodyTextAssets = {
  __typename?: 'ArticleBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ArticleRelatedContactsCollection = {
  __typename?: 'ArticleRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ArticleRelatedContactsItem>>;
};

export type ArticleRelatedContactsItem = Person;

/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type Person = Entry & {
  __typename?: 'Person';
  sys: Sys;
  linkedFrom: Maybe<PersonLinkingCollections>;
  name: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonNameArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonRoleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonEmailArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonPhoneArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Information to get in touch with someone [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person) */
export type PersonLinkArgs = {
  locale: Maybe<Scalars['String']>;
};

export type PersonLinkingCollections = {
  __typename?: 'PersonLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type PersonLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsSoftwareCollectionArgs = {
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


export type PersonLinkingCollectionsEquipmentCollectionArgs = {
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


export type PersonLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyCollection = {
  __typename?: 'CaseStudyCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CaseStudy>>;
};

/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudy = Entry & {
  __typename?: 'CaseStudy';
  sys: Sys;
  linkedFrom: Maybe<CaseStudyLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  viewType: Maybe<Scalars['String']>;
  bodyText: Maybe<CaseStudyBodyText>;
  references: Maybe<CaseStudyReferences>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection: Maybe<CaseStudyRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<CaseStudyRelatedOrgsCollection>;
  relatedItemsCollection: Maybe<CaseStudyRelatedItemsCollection>;
  relatedDocsCollection: Maybe<CaseStudyRelatedDocsCollection>;
  searchable: Maybe<Scalars['Boolean']>;
  categoryCollection: Maybe<CaseStudyCategoryCollection>;
  stageCollection: Maybe<CaseStudyStageCollection>;
  publisher: Maybe<Person>;
  owner: Maybe<Person>;
  support: Maybe<Person>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudySlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudySsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudySummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyReferencesArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudySearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyStageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyPublisherArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudyOwnerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A media rich article telling an engaging story, usually describes an example of University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy) */
export type CaseStudySupportArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyLinkingCollections = {
  __typename?: 'CaseStudyLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type CaseStudyLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsEventCollectionArgs = {
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


export type CaseStudyLinkingCollectionsSoftwareCollectionArgs = {
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


export type CaseStudyLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyBodyText = {
  __typename?: 'CaseStudyBodyText';
  json: Scalars['JSON'];
  links: CaseStudyBodyTextLinks;
};

export type CaseStudyBodyTextLinks = {
  __typename?: 'CaseStudyBodyTextLinks';
  entries: CaseStudyBodyTextEntries;
  assets: CaseStudyBodyTextAssets;
};

export type CaseStudyBodyTextEntries = {
  __typename?: 'CaseStudyBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type CaseStudyBodyTextAssets = {
  __typename?: 'CaseStudyBodyTextAssets';
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

export type CaseStudyRelatedContactsCollection = {
  __typename?: 'CaseStudyRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CaseStudyRelatedContactsItem>>;
};

export type CaseStudyRelatedContactsItem = Person;

export type CaseStudyRelatedOrgsCollection = {
  __typename?: 'CaseStudyRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

/** For describing and linking to organisational units at UoA [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/OrgUnit) */
export type OrgUnit = Entry & {
  __typename?: 'OrgUnit';
  sys: Sys;
  linkedFrom: Maybe<OrgUnitLinkingCollections>;
  name: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
};


/** For describing and linking to organisational units at UoA [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/OrgUnit) */
export type OrgUnitLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** For describing and linking to organisational units at UoA [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/OrgUnit) */
export type OrgUnitNameArgs = {
  locale: Maybe<Scalars['String']>;
};


/** For describing and linking to organisational units at UoA [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/OrgUnit) */
export type OrgUnitLinkArgs = {
  locale: Maybe<Scalars['String']>;
};

export type OrgUnitLinkingCollections = {
  __typename?: 'OrgUnitLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type OrgUnitLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrgUnitLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyRelatedItemsCollection = {
  __typename?: 'CaseStudyRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type CaseStudyRelatedDocsCollection = {
  __typename?: 'CaseStudyRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocuments = Entry & {
  __typename?: 'OfficialDocuments';
  sys: Sys;
  linkedFrom: Maybe<OfficialDocumentsLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  document: Maybe<Asset>;
};


/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocumentsLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocumentsTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocumentsSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocumentsUrlArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes and hosts or links to offical documents such as uni policies, guidelines, codes of conduct, terms of use/service, government laws/acts etc related to research and research services.   [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/officialDocuments) */
export type OfficialDocumentsDocumentArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type OfficialDocumentsLinkingCollections = {
  __typename?: 'OfficialDocumentsLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type OfficialDocumentsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OfficialDocumentsLinkingCollectionsEventCollectionArgs = {
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


export type OfficialDocumentsLinkingCollectionsSoftwareCollectionArgs = {
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


export type OfficialDocumentsLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OfficialDocumentsLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OfficialDocumentsLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyCategoryCollection = {
  __typename?: 'CaseStudyCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

/** For linking pages to content categories [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/category) */
export type Category = Entry & {
  __typename?: 'Category';
  sys: Sys;
  linkedFrom: Maybe<CategoryLinkingCollections>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};


/** For linking pages to content categories [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/category) */
export type CategoryLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** For linking pages to content categories [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/category) */
export type CategoryNameArgs = {
  locale: Maybe<Scalars['String']>;
};


/** For linking pages to content categories [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/category) */
export type CategoryDescriptionArgs = {
  locale: Maybe<Scalars['String']>;
};

export type CategoryLinkingCollections = {
  __typename?: 'CategoryLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type CategoryLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyStageCollection = {
  __typename?: 'CaseStudyStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

/** For linking pages to the most relevant stage in the research journey. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/stage) */
export type Stage = Entry & {
  __typename?: 'Stage';
  sys: Sys;
  linkedFrom: Maybe<StageLinkingCollections>;
  name: Maybe<Scalars['String']>;
};


/** For linking pages to the most relevant stage in the research journey. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/stage) */
export type StageLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** For linking pages to the most relevant stage in the research journey. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/stage) */
export type StageNameArgs = {
  locale: Maybe<Scalars['String']>;
};

export type StageLinkingCollections = {
  __typename?: 'StageLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type StageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type StageLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ArticleRelatedOrgsCollection = {
  __typename?: 'ArticleRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type ArticleRelatedItemsCollection = {
  __typename?: 'ArticleRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ArticleRelatedItemsItem>>;
};

export type ArticleRelatedItemsItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type ArticleRelatedDocsCollection = {
  __typename?: 'ArticleRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type ArticleCategoryCollection = {
  __typename?: 'ArticleCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type ArticleStageCollection = {
  __typename?: 'ArticleStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type EquipmentBodyText = {
  __typename?: 'EquipmentBodyText';
  json: Scalars['JSON'];
  links: EquipmentBodyTextLinks;
};

export type EquipmentBodyTextLinks = {
  __typename?: 'EquipmentBodyTextLinks';
  entries: EquipmentBodyTextEntries;
  assets: EquipmentBodyTextAssets;
};

export type EquipmentBodyTextEntries = {
  __typename?: 'EquipmentBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentBodyTextAssets = {
  __typename?: 'EquipmentBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EquipmentLocation = {
  __typename?: 'EquipmentLocation';
  json: Scalars['JSON'];
  links: EquipmentLocationLinks;
};

export type EquipmentLocationLinks = {
  __typename?: 'EquipmentLocationLinks';
  entries: EquipmentLocationEntries;
  assets: EquipmentLocationAssets;
};

export type EquipmentLocationEntries = {
  __typename?: 'EquipmentLocationEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EquipmentLocationAssets = {
  __typename?: 'EquipmentLocationAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type Location = {
  __typename?: 'Location';
  lat: Maybe<Scalars['Float']>;
  lon: Maybe<Scalars['Float']>;
};

export type EquipmentRelatedContactsCollection = {
  __typename?: 'EquipmentRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EquipmentRelatedContactsItem>>;
};

export type EquipmentRelatedContactsItem = Person;

export type EquipmentRelatedOrgsCollection = {
  __typename?: 'EquipmentRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type EquipmentRelatedItemsCollection = {
  __typename?: 'EquipmentRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EquipmentRelatedItemsItem>>;
};

export type EquipmentRelatedItemsItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type EquipmentRelatedDocsCollection = {
  __typename?: 'EquipmentRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type EquipmentCategoryCollection = {
  __typename?: 'EquipmentCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type EquipmentStageCollection = {
  __typename?: 'EquipmentStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type ServiceBodyText = {
  __typename?: 'ServiceBodyText';
  json: Scalars['JSON'];
  links: ServiceBodyTextLinks;
};

export type ServiceBodyTextLinks = {
  __typename?: 'ServiceBodyTextLinks';
  entries: ServiceBodyTextEntries;
  assets: ServiceBodyTextAssets;
};

export type ServiceBodyTextEntries = {
  __typename?: 'ServiceBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type ServiceBodyTextAssets = {
  __typename?: 'ServiceBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type ServiceRelatedContactsCollection = {
  __typename?: 'ServiceRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ServiceRelatedContactsItem>>;
};

export type ServiceRelatedContactsItem = Person;

export type ServiceRelatedOrgsCollection = {
  __typename?: 'ServiceRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type ServiceRelatedItemsCollection = {
  __typename?: 'ServiceRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ServiceRelatedItemsItem>>;
};

export type ServiceRelatedItemsItem = Article | CaseStudy | Event | Service | Software | SubHub;

export type ServiceRelatedDocsCollection = {
  __typename?: 'ServiceRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type ServiceCategoryCollection = {
  __typename?: 'ServiceCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type ServiceStageCollection = {
  __typename?: 'ServiceStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type SoftwareBodyText = {
  __typename?: 'SoftwareBodyText';
  json: Scalars['JSON'];
  links: SoftwareBodyTextLinks;
};

export type SoftwareBodyTextLinks = {
  __typename?: 'SoftwareBodyTextLinks';
  entries: SoftwareBodyTextEntries;
  assets: SoftwareBodyTextAssets;
};

export type SoftwareBodyTextEntries = {
  __typename?: 'SoftwareBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type SoftwareBodyTextAssets = {
  __typename?: 'SoftwareBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type SoftwareRelatedContactsCollection = {
  __typename?: 'SoftwareRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SoftwareRelatedContactsItem>>;
};

export type SoftwareRelatedContactsItem = Person;

export type SoftwareRelatedOrgsCollection = {
  __typename?: 'SoftwareRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type SoftwareRelatedItemsCollection = {
  __typename?: 'SoftwareRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SoftwareRelatedItemsItem>>;
};

export type SoftwareRelatedItemsItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type SoftwareRelatedDocsCollection = {
  __typename?: 'SoftwareRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type SoftwareCategoryCollection = {
  __typename?: 'SoftwareCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type SoftwareStageCollection = {
  __typename?: 'SoftwareStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type SubHubBodyText = {
  __typename?: 'SubHubBodyText';
  json: Scalars['JSON'];
  links: SubHubBodyTextLinks;
};

export type SubHubBodyTextLinks = {
  __typename?: 'SubHubBodyTextLinks';
  entries: SubHubBodyTextEntries;
  assets: SubHubBodyTextAssets;
};

export type SubHubBodyTextEntries = {
  __typename?: 'SubHubBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type SubHubBodyTextAssets = {
  __typename?: 'SubHubBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type SubHubInternalPagesCollection = {
  __typename?: 'SubHubInternalPagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubInternalPagesItem>>;
};

export type SubHubInternalPagesItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type SubHubExternalPagesCollection = {
  __typename?: 'SubHubExternalPagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubExternalPagesItem>>;
};

export type SubHubExternalPagesItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type SubHubRelatedContactsCollection = {
  __typename?: 'SubHubRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type SubHubRelatedOrgsCollection = {
  __typename?: 'SubHubRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type SubHubRelatedItemsCollection = {
  __typename?: 'SubHubRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubRelatedItemsItem>>;
};

export type SubHubRelatedItemsItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type SubHubRelatedDocsCollection = {
  __typename?: 'SubHubRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type SubHubCategoryCollection = {
  __typename?: 'SubHubCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type SubHubStageCollection = {
  __typename?: 'SubHubStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type EventBodyText = {
  __typename?: 'EventBodyText';
  json: Scalars['JSON'];
  links: EventBodyTextLinks;
};

export type EventBodyTextLinks = {
  __typename?: 'EventBodyTextLinks';
  entries: EventBodyTextEntries;
  assets: EventBodyTextAssets;
};

export type EventBodyTextEntries = {
  __typename?: 'EventBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EventBodyTextAssets = {
  __typename?: 'EventBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EventLocation = {
  __typename?: 'EventLocation';
  json: Scalars['JSON'];
  links: EventLocationLinks;
};

export type EventLocationLinks = {
  __typename?: 'EventLocationLinks';
  entries: EventLocationEntries;
  assets: EventLocationAssets;
};

export type EventLocationEntries = {
  __typename?: 'EventLocationEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type EventLocationAssets = {
  __typename?: 'EventLocationAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type EventRelatedContactsCollection = {
  __typename?: 'EventRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EventRelatedContactsItem>>;
};

export type EventRelatedContactsItem = Person;

export type EventRelatedOrgsCollection = {
  __typename?: 'EventRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

export type EventRelatedItemsCollection = {
  __typename?: 'EventRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EventRelatedItemsItem>>;
};

export type EventRelatedItemsItem = Article | CaseStudy | Equipment | Event | Service | Software | SubHub;

export type EventRelatedDocsCollection = {
  __typename?: 'EventRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EventRelatedDocsItem>>;
};

export type EventRelatedDocsItem = OfficialDocuments | LinkCard;

/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCard = Entry & {
  __typename?: 'LinkCard';
  sys: Sys;
  linkedFrom: Maybe<LinkCardLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  document: Maybe<Asset>;
};


/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardUrlArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites or resources and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardDocumentArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type LinkCardLinkingCollections = {
  __typename?: 'LinkCardLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  eventCollection: Maybe<EventCollection>;
};


export type LinkCardLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type LinkCardLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EventCategoryCollection = {
  __typename?: 'EventCategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type EventStageCollection = {
  __typename?: 'EventStageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type LinkCardCollection = {
  __typename?: 'LinkCardCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<LinkCard>>;
};

export type OfficialDocumentsCollection = {
  __typename?: 'OfficialDocumentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
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

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

/** Test type for UI extensions and fields. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/fieldTestType) */
export type FieldTestType = Entry & {
  __typename?: 'FieldTestType';
  sys: Sys;
  linkedFrom: Maybe<FieldTestTypeLinkingCollections>;
  editableTable: Maybe<Scalars['JSON']>;
  x: Maybe<Scalars['JSON']>;
  test: Maybe<Scalars['String']>;
};


/** Test type for UI extensions and fields. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/fieldTestType) */
export type FieldTestTypeLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Test type for UI extensions and fields. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/fieldTestType) */
export type FieldTestTypeEditableTableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Test type for UI extensions and fields. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/fieldTestType) */
export type FieldTestTypeXArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Test type for UI extensions and fields. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/fieldTestType) */
export type FieldTestTypeTestArgs = {
  locale: Maybe<Scalars['String']>;
};

export type FieldTestTypeLinkingCollections = {
  __typename?: 'FieldTestTypeLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type FieldTestTypeLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type FieldTestTypeFilter = {
  sys: Maybe<SysFilter>;
  test_exists: Maybe<Scalars['Boolean']>;
  test: Maybe<Scalars['String']>;
  test_not: Maybe<Scalars['String']>;
  test_in: Maybe<Array<Maybe<Scalars['String']>>>;
  test_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  test_contains: Maybe<Scalars['String']>;
  test_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<FieldTestTypeFilter>>>;
  AND: Maybe<Array<Maybe<FieldTestTypeFilter>>>;
};

export enum FieldTestTypeOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FieldTestTypeCollection = {
  __typename?: 'FieldTestTypeCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<FieldTestType>>;
};

export type EventFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  callToActionLabel_exists: Maybe<Scalars['Boolean']>;
  callToActionLabel: Maybe<Scalars['String']>;
  callToActionLabel_not: Maybe<Scalars['String']>;
  callToActionLabel_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_contains: Maybe<Scalars['String']>;
  callToActionLabel_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_exists: Maybe<Scalars['Boolean']>;
  audience: Maybe<Scalars['String']>;
  audience_not: Maybe<Scalars['String']>;
  audience_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_contains: Maybe<Scalars['String']>;
  audience_not_contains: Maybe<Scalars['String']>;
  mode_exists: Maybe<Scalars['Boolean']>;
  mode: Maybe<Scalars['String']>;
  mode_not: Maybe<Scalars['String']>;
  mode_in: Maybe<Array<Maybe<Scalars['String']>>>;
  mode_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  mode_contains: Maybe<Scalars['String']>;
  mode_not_contains: Maybe<Scalars['String']>;
  availability_exists: Maybe<Scalars['Boolean']>;
  availability: Maybe<Scalars['String']>;
  availability_not: Maybe<Scalars['String']>;
  availability_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_contains: Maybe<Scalars['String']>;
  availability_not_contains: Maybe<Scalars['String']>;
  date_exists: Maybe<Scalars['Boolean']>;
  date: Maybe<Scalars['DateTime']>;
  date_not: Maybe<Scalars['DateTime']>;
  date_in: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_not_in: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  date_gt: Maybe<Scalars['DateTime']>;
  date_gte: Maybe<Scalars['DateTime']>;
  date_lt: Maybe<Scalars['DateTime']>;
  date_lte: Maybe<Scalars['DateTime']>;
  access_exists: Maybe<Scalars['Boolean']>;
  access: Maybe<Scalars['String']>;
  access_not: Maybe<Scalars['String']>;
  access_in: Maybe<Array<Maybe<Scalars['String']>>>;
  access_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  access_contains: Maybe<Scalars['String']>;
  access_not_contains: Maybe<Scalars['String']>;
  capabilities_exists: Maybe<Scalars['Boolean']>;
  capabilities: Maybe<Scalars['String']>;
  capabilities_not: Maybe<Scalars['String']>;
  capabilities_in: Maybe<Array<Maybe<Scalars['String']>>>;
  capabilities_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  capabilities_contains: Maybe<Scalars['String']>;
  capabilities_not_contains: Maybe<Scalars['String']>;
  location_exists: Maybe<Scalars['Boolean']>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  address_exists: Maybe<Scalars['Boolean']>;
  address_within_circle: Maybe<Scalars['Circle']>;
  address_within_rectangle: Maybe<Scalars['Rectangle']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<EventFilter>>>;
  AND: Maybe<Array<Maybe<EventFilter>>>;
};

export type CfPersonNestedFilter = {
  sys: Maybe<SysFilter>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  role_exists: Maybe<Scalars['Boolean']>;
  role: Maybe<Scalars['String']>;
  role_not: Maybe<Scalars['String']>;
  role_in: Maybe<Array<Maybe<Scalars['String']>>>;
  role_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  role_contains: Maybe<Scalars['String']>;
  role_not_contains: Maybe<Scalars['String']>;
  email_exists: Maybe<Scalars['Boolean']>;
  email: Maybe<Scalars['String']>;
  email_not: Maybe<Scalars['String']>;
  email_in: Maybe<Array<Maybe<Scalars['String']>>>;
  email_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  email_contains: Maybe<Scalars['String']>;
  email_not_contains: Maybe<Scalars['String']>;
  phone_exists: Maybe<Scalars['Boolean']>;
  phone: Maybe<Scalars['String']>;
  phone_not: Maybe<Scalars['String']>;
  phone_in: Maybe<Array<Maybe<Scalars['String']>>>;
  phone_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  phone_contains: Maybe<Scalars['String']>;
  phone_not_contains: Maybe<Scalars['String']>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<CfPersonNestedFilter>>>;
  AND: Maybe<Array<Maybe<CfPersonNestedFilter>>>;
};



export enum EventOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  CallToActionLabelAsc = 'callToActionLabel_ASC',
  CallToActionLabelDesc = 'callToActionLabel_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  ModeAsc = 'mode_ASC',
  ModeDesc = 'mode_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  AccessAsc = 'access_ASC',
  AccessDesc = 'access_DESC',
  CapabilitiesAsc = 'capabilities_ASC',
  CapabilitiesDesc = 'capabilities_DESC',
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

export type PersonFilter = {
  sys: Maybe<SysFilter>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  role_exists: Maybe<Scalars['Boolean']>;
  role: Maybe<Scalars['String']>;
  role_not: Maybe<Scalars['String']>;
  role_in: Maybe<Array<Maybe<Scalars['String']>>>;
  role_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  role_contains: Maybe<Scalars['String']>;
  role_not_contains: Maybe<Scalars['String']>;
  email_exists: Maybe<Scalars['Boolean']>;
  email: Maybe<Scalars['String']>;
  email_not: Maybe<Scalars['String']>;
  email_in: Maybe<Array<Maybe<Scalars['String']>>>;
  email_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  email_contains: Maybe<Scalars['String']>;
  email_not_contains: Maybe<Scalars['String']>;
  phone_exists: Maybe<Scalars['Boolean']>;
  phone: Maybe<Scalars['String']>;
  phone_not: Maybe<Scalars['String']>;
  phone_in: Maybe<Array<Maybe<Scalars['String']>>>;
  phone_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  phone_contains: Maybe<Scalars['String']>;
  phone_not_contains: Maybe<Scalars['String']>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<PersonFilter>>>;
  AND: Maybe<Array<Maybe<PersonFilter>>>;
};

export enum PersonOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  RoleAsc = 'role_ASC',
  RoleDesc = 'role_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PersonCollection = {
  __typename?: 'PersonCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type SubHubFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  featured_exists: Maybe<Scalars['Boolean']>;
  featured: Maybe<Scalars['Boolean']>;
  featured_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  internalPagesCollection_exists: Maybe<Scalars['Boolean']>;
  externalPagesCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<SubHubFilter>>>;
  AND: Maybe<Array<Maybe<SubHubFilter>>>;
};

export enum SubHubOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  FeaturedAsc = 'featured_ASC',
  FeaturedDesc = 'featured_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
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

export type SoftwareFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  callToActionLabel_exists: Maybe<Scalars['Boolean']>;
  callToActionLabel: Maybe<Scalars['String']>;
  callToActionLabel_not: Maybe<Scalars['String']>;
  callToActionLabel_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_contains: Maybe<Scalars['String']>;
  callToActionLabel_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  licencing_exists: Maybe<Scalars['Boolean']>;
  licencing: Maybe<Scalars['String']>;
  licencing_not: Maybe<Scalars['String']>;
  licencing_in: Maybe<Array<Maybe<Scalars['String']>>>;
  licencing_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  licencing_contains: Maybe<Scalars['String']>;
  licencing_not_contains: Maybe<Scalars['String']>;
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
  limitations_exists: Maybe<Scalars['Boolean']>;
  limitations: Maybe<Scalars['String']>;
  limitations_not: Maybe<Scalars['String']>;
  limitations_in: Maybe<Array<Maybe<Scalars['String']>>>;
  limitations_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  limitations_contains: Maybe<Scalars['String']>;
  limitations_not_contains: Maybe<Scalars['String']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<SoftwareFilter>>>;
  AND: Maybe<Array<Maybe<SoftwareFilter>>>;
};

export enum SoftwareOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  CallToActionLabelAsc = 'callToActionLabel_ASC',
  CallToActionLabelDesc = 'callToActionLabel_DESC',
  LicencingAsc = 'licencing_ASC',
  LicencingDesc = 'licencing_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
  AccessAsc = 'access_ASC',
  AccessDesc = 'access_DESC',
  LimitationsAsc = 'limitations_ASC',
  LimitationsDesc = 'limitations_DESC',
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

export type ServiceFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  callToActionLabel_exists: Maybe<Scalars['Boolean']>;
  callToActionLabel: Maybe<Scalars['String']>;
  callToActionLabel_not: Maybe<Scalars['String']>;
  callToActionLabel_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_contains: Maybe<Scalars['String']>;
  callToActionLabel_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_exists: Maybe<Scalars['Boolean']>;
  audience: Maybe<Scalars['String']>;
  audience_not: Maybe<Scalars['String']>;
  audience_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_contains: Maybe<Scalars['String']>;
  audience_not_contains: Maybe<Scalars['String']>;
  availability_exists: Maybe<Scalars['Boolean']>;
  availability: Maybe<Scalars['String']>;
  availability_not: Maybe<Scalars['String']>;
  availability_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_contains: Maybe<Scalars['String']>;
  availability_not_contains: Maybe<Scalars['String']>;
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
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<ServiceFilter>>>;
  AND: Maybe<Array<Maybe<ServiceFilter>>>;
};

export enum ServiceOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  CallToActionLabelAsc = 'callToActionLabel_ASC',
  CallToActionLabelDesc = 'callToActionLabel_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
  AccessAsc = 'access_ASC',
  AccessDesc = 'access_DESC',
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

export type EquipmentFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  callToActionLabel_exists: Maybe<Scalars['Boolean']>;
  callToActionLabel: Maybe<Scalars['String']>;
  callToActionLabel_not: Maybe<Scalars['String']>;
  callToActionLabel_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_contains: Maybe<Scalars['String']>;
  callToActionLabel_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
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
  yearOfManufacture_exists: Maybe<Scalars['Boolean']>;
  yearOfManufacture: Maybe<Scalars['Int']>;
  yearOfManufacture_not: Maybe<Scalars['Int']>;
  yearOfManufacture_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  yearOfManufacture_not_in: Maybe<Array<Maybe<Scalars['Int']>>>;
  yearOfManufacture_gt: Maybe<Scalars['Int']>;
  yearOfManufacture_gte: Maybe<Scalars['Int']>;
  yearOfManufacture_lt: Maybe<Scalars['Int']>;
  yearOfManufacture_lte: Maybe<Scalars['Int']>;
  audience_exists: Maybe<Scalars['Boolean']>;
  audience: Maybe<Scalars['String']>;
  audience_not: Maybe<Scalars['String']>;
  audience_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_contains: Maybe<Scalars['String']>;
  audience_not_contains: Maybe<Scalars['String']>;
  availability_exists: Maybe<Scalars['Boolean']>;
  availability: Maybe<Scalars['String']>;
  availability_not: Maybe<Scalars['String']>;
  availability_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  availability_contains: Maybe<Scalars['String']>;
  availability_not_contains: Maybe<Scalars['String']>;
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
  location_exists: Maybe<Scalars['Boolean']>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  address_exists: Maybe<Scalars['Boolean']>;
  address_within_circle: Maybe<Scalars['Circle']>;
  address_within_rectangle: Maybe<Scalars['Rectangle']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<EquipmentFilter>>>;
  AND: Maybe<Array<Maybe<EquipmentFilter>>>;
};

export enum EquipmentOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  CallToActionLabelAsc = 'callToActionLabel_ASC',
  CallToActionLabelDesc = 'callToActionLabel_DESC',
  ManufacturerAsc = 'manufacturer_ASC',
  ManufacturerDesc = 'manufacturer_DESC',
  ModelAsc = 'model_ASC',
  ModelDesc = 'model_DESC',
  YearOfManufactureAsc = 'yearOfManufacture_ASC',
  YearOfManufactureDesc = 'yearOfManufacture_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
  AccessAsc = 'access_ASC',
  AccessDesc = 'access_DESC',
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

export type CaseStudyFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  references_exists: Maybe<Scalars['Boolean']>;
  references_contains: Maybe<Scalars['String']>;
  references_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
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
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
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

export type ArticleFilter = {
  publisher: Maybe<CfPersonNestedFilter>;
  owner: Maybe<CfPersonNestedFilter>;
  support: Maybe<CfPersonNestedFilter>;
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  callToActionLabel_exists: Maybe<Scalars['Boolean']>;
  callToActionLabel: Maybe<Scalars['String']>;
  callToActionLabel_not: Maybe<Scalars['String']>;
  callToActionLabel_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToActionLabel_contains: Maybe<Scalars['String']>;
  callToActionLabel_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  categoryCollection_exists: Maybe<Scalars['Boolean']>;
  stageCollection_exists: Maybe<Scalars['Boolean']>;
  publisher_exists: Maybe<Scalars['Boolean']>;
  owner_exists: Maybe<Scalars['Boolean']>;
  support_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<ArticleFilter>>>;
  AND: Maybe<Array<Maybe<ArticleFilter>>>;
};

export enum ArticleOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  CallToActionLabelAsc = 'callToActionLabel_ASC',
  CallToActionLabelDesc = 'callToActionLabel_DESC',
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

export type CategoryFilter = {
  sys: Maybe<SysFilter>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  description_exists: Maybe<Scalars['Boolean']>;
  description: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<CategoryFilter>>>;
  AND: Maybe<Array<Maybe<CategoryFilter>>>;
};

export enum CategoryOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CategoryCollection = {
  __typename?: 'CategoryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Category>>;
};

export type OrgUnitFilter = {
  sys: Maybe<SysFilter>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<OrgUnitFilter>>>;
  AND: Maybe<Array<Maybe<OrgUnitFilter>>>;
};

export enum OrgUnitOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type OrgUnitCollection = {
  __typename?: 'OrgUnitCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrgUnit>>;
};

/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItem = Entry & {
  __typename?: 'PartFeaturedItem';
  sys: Sys;
  linkedFrom: Maybe<PartFeaturedItemLinkingCollections>;
  title: Maybe<Scalars['String']>;
  bodyText: Maybe<PartFeaturedItemBodyText>;
  callToAction: Maybe<Scalars['String']>;
  limiter: Maybe<Scalars['String']>;
};


/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItemLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItemTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItemBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItemCallToActionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A featured item displayed on the homepage. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/partFeaturedItem) */
export type PartFeaturedItemLimiterArgs = {
  locale: Maybe<Scalars['String']>;
};

export type PartFeaturedItemLinkingCollections = {
  __typename?: 'PartFeaturedItemLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type PartFeaturedItemLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type PartFeaturedItemBodyText = {
  __typename?: 'PartFeaturedItemBodyText';
  json: Scalars['JSON'];
  links: PartFeaturedItemBodyTextLinks;
};

export type PartFeaturedItemBodyTextLinks = {
  __typename?: 'PartFeaturedItemBodyTextLinks';
  entries: PartFeaturedItemBodyTextEntries;
  assets: PartFeaturedItemBodyTextAssets;
};

export type PartFeaturedItemBodyTextEntries = {
  __typename?: 'PartFeaturedItemBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type PartFeaturedItemBodyTextAssets = {
  __typename?: 'PartFeaturedItemBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type PartFeaturedItemFilter = {
  sys: Maybe<SysFilter>;
  title_exists: Maybe<Scalars['Boolean']>;
  title: Maybe<Scalars['String']>;
  title_not: Maybe<Scalars['String']>;
  title_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains: Maybe<Scalars['String']>;
  title_not_contains: Maybe<Scalars['String']>;
  bodyText_exists: Maybe<Scalars['Boolean']>;
  bodyText_contains: Maybe<Scalars['String']>;
  bodyText_not_contains: Maybe<Scalars['String']>;
  callToAction_exists: Maybe<Scalars['Boolean']>;
  callToAction: Maybe<Scalars['String']>;
  callToAction_not: Maybe<Scalars['String']>;
  callToAction_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  callToAction_contains: Maybe<Scalars['String']>;
  callToAction_not_contains: Maybe<Scalars['String']>;
  limiter_exists: Maybe<Scalars['Boolean']>;
  limiter: Maybe<Scalars['String']>;
  limiter_not: Maybe<Scalars['String']>;
  limiter_in: Maybe<Array<Maybe<Scalars['String']>>>;
  limiter_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  limiter_contains: Maybe<Scalars['String']>;
  limiter_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<PartFeaturedItemFilter>>>;
  AND: Maybe<Array<Maybe<PartFeaturedItemFilter>>>;
};

export enum PartFeaturedItemOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CallToActionAsc = 'callToAction_ASC',
  CallToActionDesc = 'callToAction_DESC',
  LimiterAsc = 'limiter_ASC',
  LimiterDesc = 'limiter_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PartFeaturedItemCollection = {
  __typename?: 'PartFeaturedItemCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<PartFeaturedItem>>;
};

export type StageFilter = {
  sys: Maybe<SysFilter>;
  name_exists: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  OR: Maybe<Array<Maybe<StageFilter>>>;
  AND: Maybe<Array<Maybe<StageFilter>>>;
};

export enum StageOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type StageCollection = {
  __typename?: 'StageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Stage>>;
};

export type LinkCardFilter = {
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
  document_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<LinkCardFilter>>>;
  AND: Maybe<Array<Maybe<LinkCardFilter>>>;
};

export enum LinkCardOrder {
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
  document_exists: Maybe<Scalars['Boolean']>;
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

/** Link to a YouTube video [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/video) */
export type Video = Entry & {
  __typename?: 'Video';
  sys: Sys;
  linkedFrom: Maybe<VideoLinkingCollections>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};


/** Link to a YouTube video [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/video) */
export type VideoLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Link to a YouTube video [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/video) */
export type VideoTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Link to a YouTube video [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/video) */
export type VideoDescriptionArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Link to a YouTube video [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/video) */
export type VideoUrlArgs = {
  locale: Maybe<Scalars['String']>;
};

export type VideoLinkingCollections = {
  __typename?: 'VideoLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type VideoLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type VideoFilter = {
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
  OR: Maybe<Array<Maybe<VideoFilter>>>;
  AND: Maybe<Array<Maybe<VideoFilter>>>;
};

export enum VideoOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
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

export type VideoCollection = {
  __typename?: 'VideoCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Video>>;
};

export type AssetFieldsFragment = { __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string>, size: Maybe<number>, contentType: Maybe<string>, sys: { __typename?: 'Sys', id: string } };

type PublicFields_Event_Fragment = { __typename: 'Event', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_SubHub_Fragment = { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_Software_Fragment = { __typename: 'Software', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_Service_Fragment = { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_Equipment_Fragment = { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_Article_Fragment = { __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }> };

type PublicFields_Person_Fragment = { __typename: 'Person', name: Maybe<string> };

type PublicFields_CaseStudy_Fragment = { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> };

type PublicFields_OrgUnit_Fragment = { __typename: 'OrgUnit', name: Maybe<string>, link: Maybe<string> };

type PublicFields_OfficialDocuments_Fragment = { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> };

type PublicFields_Category_Fragment = { __typename?: 'Category' };

type PublicFields_Stage_Fragment = { __typename?: 'Stage' };

type PublicFields_LinkCard_Fragment = { __typename?: 'LinkCard', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string> };

type PublicFields_FieldTestType_Fragment = { __typename?: 'FieldTestType' };

type PublicFields_PartFeaturedItem_Fragment = { __typename?: 'PartFeaturedItem' };

type PublicFields_Video_Fragment = { __typename?: 'Video', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> };

export type PublicFieldsFragment = PublicFields_Event_Fragment | PublicFields_SubHub_Fragment | PublicFields_Software_Fragment | PublicFields_Service_Fragment | PublicFields_Equipment_Fragment | PublicFields_Article_Fragment | PublicFields_Person_Fragment | PublicFields_CaseStudy_Fragment | PublicFields_OrgUnit_Fragment | PublicFields_OfficialDocuments_Fragment | PublicFields_Category_Fragment | PublicFields_Stage_Fragment | PublicFields_LinkCard_Fragment | PublicFields_FieldTestType_Fragment | PublicFields_PartFeaturedItem_Fragment | PublicFields_Video_Fragment;

export type AllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllArticlesQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<(
      { __typename?: 'Article' }
      & PublicFields_Article_Fragment
    )>> }> };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', categoryCollection: Maybe<{ __typename?: 'CategoryCollection', items: Array<Maybe<{ __typename?: 'Category', name: Maybe<string>, description: Maybe<string> }>> }> };

export type AllContentItemParentSubHubsQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type AllContentItemParentSubHubsQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', title: Maybe<string>, ssoProtected: Maybe<boolean>, linkedFrom: Maybe<{ __typename?: 'SubHubLinkingCollections', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string> }>> }> }> }>> }> };

export type AllEquipmentQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEquipmentQuery = { __typename?: 'Query', equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<(
      { __typename?: 'Equipment' }
      & PublicFields_Equipment_Fragment
    )>> }> };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', eventCollection: Maybe<{ __typename?: 'EventCollection', items: Array<Maybe<(
      { __typename?: 'Event' }
      & PublicFields_Event_Fragment
    )>> }> };

export type AllSearchableContentPublicFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSearchableContentPublicFieldsQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<(
      { __typename?: 'Article' }
      & PublicFields_Article_Fragment
    )>> }>, caseStudyCollection: Maybe<{ __typename?: 'CaseStudyCollection', items: Array<Maybe<(
      { __typename?: 'CaseStudy' }
      & PublicFields_CaseStudy_Fragment
    )>> }>, equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<(
      { __typename?: 'Equipment' }
      & PublicFields_Equipment_Fragment
    )>> }>, eventCollection: Maybe<{ __typename?: 'EventCollection', items: Array<Maybe<(
      { __typename?: 'Event' }
      & PublicFields_Event_Fragment
    )>> }>, serviceCollection: Maybe<{ __typename?: 'ServiceCollection', items: Array<Maybe<(
      { __typename?: 'Service' }
      & PublicFields_Service_Fragment
    )>> }>, softwareCollection: Maybe<{ __typename?: 'SoftwareCollection', items: Array<Maybe<(
      { __typename?: 'Software' }
      & PublicFields_Software_Fragment
    )>> }>, subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<(
      { __typename?: 'SubHub' }
      & PublicFields_SubHub_Fragment
    )>> }> };

export type AllServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllServicesQuery = { __typename?: 'Query', serviceCollection: Maybe<{ __typename?: 'ServiceCollection', items: Array<Maybe<(
      { __typename?: 'Service' }
      & PublicFields_Service_Fragment
    )>> }> };

export type AllSoftwareQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSoftwareQuery = { __typename?: 'Query', softwareCollection: Maybe<{ __typename?: 'SoftwareCollection', items: Array<Maybe<(
      { __typename?: 'Software' }
      & PublicFields_Software_Fragment
    )>> }> };

export type GetAllSubHubChildPagesSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSubHubChildPagesSlugsQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, internalPagesCollection: Maybe<{ __typename?: 'SubHubInternalPagesCollection', items: Array<Maybe<{ __typename?: 'Article', slug: Maybe<string> } | { __typename?: 'CaseStudy', slug: Maybe<string> } | { __typename?: 'Equipment', slug: Maybe<string> } | { __typename?: 'Event', slug: Maybe<string> } | { __typename?: 'Service', slug: Maybe<string> } | { __typename?: 'Software', slug: Maybe<string> } | { __typename?: 'SubHub', slug: Maybe<string> }>> }> }>> }> };

export type AllSubHubQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubHubQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<(
      { __typename?: 'SubHub' }
      & PublicFields_SubHub_Fragment
    )>> }> };

export type GetArticleBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetArticleBySlugQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<{ __typename: 'Article', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, viewType: Maybe<string>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'ArticleBodyText', json: any, links: { __typename?: 'ArticleBodyTextLinks', entries: { __typename?: 'ArticleBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'ArticleBodyTextAssets', block: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>> } } }>, relatedItemsCollection: Maybe<{ __typename?: 'ArticleRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'ArticleRelatedOrgsCollection', items: Array<Maybe<(
          { __typename?: 'OrgUnit' }
          & PublicFields_OrgUnit_Fragment
        )>> }>, relatedDocsCollection: Maybe<{ __typename?: 'ArticleRelatedDocsCollection', items: Array<Maybe<(
          { __typename?: 'OfficialDocuments' }
          & PublicFields_OfficialDocuments_Fragment
        )>> }>, relatedContactsCollection: Maybe<{ __typename?: 'ArticleRelatedContactsCollection', items: Array<Maybe<(
          { __typename?: 'Person', role: Maybe<string> }
          & PublicFields_Person_Fragment
        )>> }> }>> }> };

export type GetEquipmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEquipmentByIdQuery = { __typename?: 'Query', equipment: Maybe<{ __typename: 'Equipment', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, callToAction: Maybe<string>, callToActionLabel: Maybe<string>, manufacturer: Maybe<string>, model: Maybe<string>, yearOfManufacture: Maybe<number>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'EquipmentBodyText', json: any, links: { __typename?: 'EquipmentBodyTextLinks', entries: { __typename?: 'EquipmentBodyTextEntries', block: Array<Maybe<(
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'SubHub' }
            & PublicFields_SubHub_Fragment
          ) | (
            { __typename?: 'Software' }
            & PublicFields_Software_Fragment
          ) | (
            { __typename?: 'Service' }
            & PublicFields_Service_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
          ) | (
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'OrgUnit' }
            & PublicFields_OrgUnit_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'Category' }
            & PublicFields_Category_Fragment
          ) | (
            { __typename?: 'Stage' }
            & PublicFields_Stage_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'FieldTestType' }
            & PublicFields_FieldTestType_Fragment
          ) | (
            { __typename?: 'PartFeaturedItem' }
            & PublicFields_PartFeaturedItem_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'SubHub' }
            & PublicFields_SubHub_Fragment
          ) | (
            { __typename?: 'Software' }
            & PublicFields_Software_Fragment
          ) | (
            { __typename?: 'Service' }
            & PublicFields_Service_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
          ) | (
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'OrgUnit' }
            & PublicFields_OrgUnit_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'Category' }
            & PublicFields_Category_Fragment
          ) | (
            { __typename?: 'Stage' }
            & PublicFields_Stage_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'FieldTestType' }
            & PublicFields_FieldTestType_Fragment
          ) | (
            { __typename?: 'PartFeaturedItem' }
            & PublicFields_PartFeaturedItem_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'SubHub' }
            & PublicFields_SubHub_Fragment
          ) | (
            { __typename?: 'Software' }
            & PublicFields_Software_Fragment
          ) | (
            { __typename?: 'Service' }
            & PublicFields_Service_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
          ) | (
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'OrgUnit' }
            & PublicFields_OrgUnit_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'Category' }
            & PublicFields_Category_Fragment
          ) | (
            { __typename?: 'Stage' }
            & PublicFields_Stage_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'FieldTestType' }
            & PublicFields_FieldTestType_Fragment
          ) | (
            { __typename?: 'PartFeaturedItem' }
            & PublicFields_PartFeaturedItem_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          )>> }, assets: { __typename?: 'EquipmentBodyTextAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, relatedItemsCollection: Maybe<{ __typename?: 'EquipmentRelatedItemsCollection', items: Array<Maybe<(
        { __typename?: 'Article' }
        & PublicFields_Article_Fragment
      ) | (
        { __typename?: 'CaseStudy' }
        & PublicFields_CaseStudy_Fragment
      ) | (
        { __typename?: 'Equipment' }
        & PublicFields_Equipment_Fragment
      ) | (
        { __typename?: 'Event' }
        & PublicFields_Event_Fragment
      ) | (
        { __typename?: 'Service' }
        & PublicFields_Service_Fragment
      ) | (
        { __typename?: 'Software' }
        & PublicFields_Software_Fragment
      ) | (
        { __typename?: 'SubHub' }
        & PublicFields_SubHub_Fragment
      )>> }>, relatedContactsCollection: Maybe<{ __typename?: 'EquipmentRelatedContactsCollection', items: Array<Maybe<(
        { __typename?: 'Person' }
        & PublicFields_Person_Fragment
      )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'EquipmentRelatedOrgsCollection', items: Array<Maybe<(
        { __typename?: 'OrgUnit' }
        & PublicFields_OrgUnit_Fragment
      )>> }>, location: Maybe<{ __typename?: 'EquipmentLocation', json: any }> }> };

export type GetEquipmentBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetEquipmentBySlugQuery = { __typename?: 'Query', equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<{ __typename: 'Equipment', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, callToAction: Maybe<string>, callToActionLabel: Maybe<string>, manufacturer: Maybe<string>, model: Maybe<string>, yearOfManufacture: Maybe<number>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'EquipmentBodyText', json: any, links: { __typename?: 'EquipmentBodyTextLinks', entries: { __typename?: 'EquipmentBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'EquipmentBodyTextAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, relatedItemsCollection: Maybe<{ __typename?: 'EquipmentRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, relatedContactsCollection: Maybe<{ __typename?: 'EquipmentRelatedContactsCollection', items: Array<Maybe<(
          { __typename?: 'Person' }
          & PublicFields_Person_Fragment
        )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'EquipmentRelatedOrgsCollection', items: Array<Maybe<(
          { __typename?: 'OrgUnit' }
          & PublicFields_OrgUnit_Fragment
        )>> }>, location: Maybe<{ __typename?: 'EquipmentLocation', json: any }> }>> }> };

export type GetEventBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventCollection: Maybe<{ __typename?: 'EventCollection', items: Array<Maybe<{ __typename?: 'Event', ssoProtected: Maybe<boolean>, title: Maybe<string>, slug: Maybe<string>, searchable: Maybe<boolean>, summary: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, callToAction: Maybe<string>, audience: Maybe<string>, mode: Maybe<string>, availability: Maybe<string>, date: Maybe<any>, capabilities: Maybe<string>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'EventBodyText', json: any, links: { __typename?: 'EventBodyTextLinks', entries: { __typename?: 'EventBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'EventBodyTextAssets', block: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>> } } }>, relatedContactsCollection: Maybe<{ __typename?: 'EventRelatedContactsCollection', items: Array<Maybe<(
          { __typename?: 'Person' }
          & PublicFields_Person_Fragment
        )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'EventRelatedOrgsCollection', items: Array<Maybe<(
          { __typename?: 'OrgUnit' }
          & PublicFields_OrgUnit_Fragment
        )>> }>, relatedItemsCollection: Maybe<{ __typename?: 'EventRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, location: Maybe<{ __typename?: 'EventLocation', json: any }>, address: Maybe<{ __typename?: 'Location', lat: Maybe<number>, lon: Maybe<number> }> }>> }> };

export type GetServiceBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetServiceBySlugQuery = { __typename?: 'Query', serviceCollection: Maybe<{ __typename?: 'ServiceCollection', items: Array<Maybe<{ __typename: 'Service', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, callToAction: Maybe<string>, callToActionLabel: Maybe<string>, audience: Maybe<string>, availability: Maybe<string>, cost: Maybe<string>, access: Maybe<string>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'ServiceBodyText', json: any, links: { __typename?: 'ServiceBodyTextLinks', entries: { __typename?: 'ServiceBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event' }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub' }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software' }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service' }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment' }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article' }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person' }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy' }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit' }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments' }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category' }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage' }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard' }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType' }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem' }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video' }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'ServiceBodyTextAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, relatedContactsCollection: Maybe<{ __typename?: 'ServiceRelatedContactsCollection', items: Array<Maybe<(
          { __typename?: 'Person' }
          & PublicFields_Person_Fragment
        )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'ServiceRelatedOrgsCollection', items: Array<Maybe<(
          { __typename?: 'OrgUnit' }
          & PublicFields_OrgUnit_Fragment
        )>> }>, relatedItemsCollection: Maybe<{ __typename?: 'ServiceRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }> }>> }> };

export type GetSoftwareBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetSoftwareBySlugQuery = { __typename?: 'Query', softwareCollection: Maybe<{ __typename?: 'SoftwareCollection', items: Array<Maybe<{ __typename: 'Software', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string>, searchable: Maybe<boolean>, callToAction: Maybe<string>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'SoftwareBodyText', json: any, links: { __typename?: 'SoftwareBodyTextLinks', entries: { __typename?: 'SoftwareBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'SoftwareBodyTextAssets', block: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>> } } }>, relatedContactsCollection: Maybe<{ __typename?: 'SoftwareRelatedContactsCollection', items: Array<Maybe<(
          { __typename?: 'Person', email: Maybe<string> }
          & PublicFields_Person_Fragment
        )>> }>, relatedItemsCollection: Maybe<{ __typename?: 'SoftwareRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'SoftwareRelatedOrgsCollection', items: Array<Maybe<(
          { __typename?: 'OrgUnit' }
          & PublicFields_OrgUnit_Fragment
        )>> }>, support: Maybe<(
        { __typename?: 'Person', email: Maybe<string> }
        & PublicFields_Person_Fragment
      )>, publisher: Maybe<(
        { __typename?: 'Person', email: Maybe<string> }
        & PublicFields_Person_Fragment
      )>, owner: Maybe<(
        { __typename?: 'Person', email: Maybe<string> }
        & PublicFields_Person_Fragment
      )> }>> }> };

export type GetSubHubBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetSubHubBySlugQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, keywords: Maybe<Array<Maybe<string>>>, viewType: Maybe<string>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'SubHubBodyText', json: any, links: { __typename?: 'SubHubBodyTextLinks', entries: { __typename?: 'SubHubBodyTextEntries', block: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, inline: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Event_Fragment
            ) | (
              { __typename?: 'SubHub', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_SubHub_Fragment
            ) | (
              { __typename?: 'Software', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Software_Fragment
            ) | (
              { __typename?: 'Service', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Service_Fragment
            ) | (
              { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Equipment_Fragment
            ) | (
              { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Article_Fragment
            ) | (
              { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Person_Fragment
            ) | (
              { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_CaseStudy_Fragment
            ) | (
              { __typename?: 'OrgUnit', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OrgUnit_Fragment
            ) | (
              { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_OfficialDocuments_Fragment
            ) | (
              { __typename?: 'Category', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Category_Fragment
            ) | (
              { __typename?: 'Stage', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Stage_Fragment
            ) | (
              { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_LinkCard_Fragment
            ) | (
              { __typename?: 'FieldTestType', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_FieldTestType_Fragment
            ) | (
              { __typename?: 'PartFeaturedItem', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_PartFeaturedItem_Fragment
            ) | (
              { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
              & PublicFields_Video_Fragment
            )>> }, assets: { __typename?: 'SubHubBodyTextAssets', block: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>>, hyperlink: Array<Maybe<(
              { __typename?: 'Asset' }
              & AssetFieldsFragment
            )>> } } }>, internalPagesCollection: Maybe<{ __typename?: 'SubHubInternalPagesCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, externalPagesCollection: Maybe<{ __typename?: 'SubHubExternalPagesCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }>, relatedItemsCollection: Maybe<{ __typename?: 'SubHubRelatedItemsCollection', items: Array<Maybe<(
          { __typename?: 'Article' }
          & PublicFields_Article_Fragment
        ) | (
          { __typename?: 'CaseStudy' }
          & PublicFields_CaseStudy_Fragment
        ) | (
          { __typename?: 'Equipment' }
          & PublicFields_Equipment_Fragment
        ) | (
          { __typename?: 'Event' }
          & PublicFields_Event_Fragment
        ) | (
          { __typename?: 'Service' }
          & PublicFields_Service_Fragment
        ) | (
          { __typename?: 'Software' }
          & PublicFields_Software_Fragment
        ) | (
          { __typename?: 'SubHub' }
          & PublicFields_SubHub_Fragment
        )>> }> }>> }> };

export const AssetFieldsFragmentDoc = gql`
    fragment AssetFields on Asset {
  sys {
    id
  }
  title
  description
  url
  size
  contentType
}
    `;
export const PublicFieldsFragmentDoc = gql`
    fragment PublicFields on Entry {
  ... on Article {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    ssoProtected
    searchable
    banner {
      title
      description
      url
    }
  }
  ... on CaseStudy {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Equipment {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    banner {
      url
    }
    ssoProtected
    searchable
  }
  ... on Event {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    banner {
      url
    }
    ssoProtected
    searchable
  }
  ... on Service {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Software {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on SubHub {
    __typename
    icon {
      url
    }
    slug
    title
    summary
    ssoProtected
    searchable
    banner {
      url
    }
  }
  ... on OfficialDocuments {
    __typename
    title
    summary
  }
  ... on OrgUnit {
    __typename
    name
    link
  }
  ... on LinkCard {
    title
    summary
    url
  }
  ... on Person {
    __typename
    name
  }
  ... on Video {
    title
    description
    url
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
export const AllCategoriesDocument = gql`
    query AllCategories {
  categoryCollection(order: [name_ASC]) {
    items {
      name
      description
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllCategoriesGQL extends Apollo.Query<AllCategoriesQuery, AllCategoriesQueryVariables> {
    document = AllCategoriesDocument;
    
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
export const AllEventsDocument = gql`
    query AllEvents {
  eventCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllEventsGQL extends Apollo.Query<AllEventsQuery, AllEventsQueryVariables> {
    document = AllEventsDocument;
    
  }
export const AllSearchableContentPublicFieldsDocument = gql`
    query AllSearchableContentPublicFields {
  articleCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  caseStudyCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  equipmentCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  eventCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  serviceCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  softwareCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  subHubCollection(where: {searchable: true}) {
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
export const AllServicesDocument = gql`
    query AllServices {
  serviceCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllServicesGQL extends Apollo.Query<AllServicesQuery, AllServicesQueryVariables> {
    document = AllServicesDocument;
    
  }
export const AllSoftwareDocument = gql`
    query AllSoftware {
  softwareCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSoftwareGQL extends Apollo.Query<AllSoftwareQuery, AllSoftwareQueryVariables> {
    document = AllSoftwareDocument;
    
  }
export const GetAllSubHubChildPagesSlugsDocument = gql`
    query GetAllSubHubChildPagesSlugs {
  subHubCollection {
    items {
      slug
      title
      internalPagesCollection {
        items {
          ... on Article {
            slug
          }
          ... on CaseStudy {
            slug
          }
          ... on Equipment {
            slug
          }
          ... on Event {
            slug
          }
          ... on Service {
            slug
          }
          ... on Software {
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
export const AllSubHubDocument = gql`
    query AllSubHub {
  subHubCollection {
    items {
      ...PublicFields
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSubHubGQL extends Apollo.Query<AllSubHubQuery, AllSubHubQueryVariables> {
    document = AllSubHubDocument;
    
  }
export const GetArticleBySlugDocument = gql`
    query GetArticleBySlug($slug: String) {
  articleCollection(limit: 1, where: {slug: $slug}) {
    items {
      __typename
      sys {
        id
      }
      title
      slug
      ssoProtected
      searchable
      banner {
        title
        description
        url
      }
      summary
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
              sys {
                id
              }
            }
            inline {
              ...PublicFields
              sys {
                id
              }
            }
            hyperlink {
              ...PublicFields
              sys {
                id
              }
            }
          }
          assets {
            block {
              ...AssetFields
            }
            hyperlink {
              ...AssetFields
            }
          }
        }
      }
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      relatedOrgsCollection {
        items {
          ...PublicFields
        }
      }
      relatedDocsCollection {
        items {
          ...PublicFields
        }
      }
      relatedContactsCollection {
        items {
          ...PublicFields
          ... on Person {
            role
          }
        }
      }
      viewType
    }
  }
}
    ${PublicFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleBySlugGQL extends Apollo.Query<GetArticleBySlugQuery, GetArticleBySlugQueryVariables> {
    document = GetArticleBySlugDocument;
    
  }
export const GetEquipmentByIdDocument = gql`
    query GetEquipmentByID($id: String!) {
  equipment(id: $id) {
    __typename
    sys {
      id
    }
    title
    slug
    ssoProtected
    searchable
    banner {
      title
      description
      url
    }
    icon {
      title
      description
      url
    }
    summary
    callToAction
    callToActionLabel
    bodyText {
      json
      links {
        entries {
          block {
            ...PublicFields
          }
          inline {
            ...PublicFields
          }
          hyperlink {
            ...PublicFields
          }
        }
        assets {
          block {
            title
            description
            url
          }
          hyperlink {
            title
            description
            url
          }
        }
      }
    }
    manufacturer
    model
    yearOfManufacture
    relatedItemsCollection {
      items {
        ...PublicFields
      }
    }
    relatedContactsCollection {
      items {
        ...PublicFields
      }
    }
    relatedOrgsCollection {
      items {
        ...PublicFields
      }
    }
    location {
      json
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentByIdGQL extends Apollo.Query<GetEquipmentByIdQuery, GetEquipmentByIdQueryVariables> {
    document = GetEquipmentByIdDocument;
    
  }
export const GetEquipmentBySlugDocument = gql`
    query GetEquipmentBySlug($slug: String) {
  equipmentCollection(limit: 1, where: {slug: $slug}) {
    items {
      __typename
      sys {
        id
      }
      title
      slug
      ssoProtected
      searchable
      banner {
        title
        description
        url
      }
      icon {
        title
        description
        url
      }
      summary
      callToAction
      callToActionLabel
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
            }
            inline {
              ...PublicFields
            }
            hyperlink {
              ...PublicFields
            }
          }
          assets {
            block {
              title
              description
              url
            }
            hyperlink {
              title
              description
              url
            }
          }
        }
      }
      manufacturer
      model
      yearOfManufacture
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      relatedContactsCollection {
        items {
          ...PublicFields
        }
      }
      relatedOrgsCollection {
        items {
          ...PublicFields
        }
      }
      location {
        json
      }
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentBySlugGQL extends Apollo.Query<GetEquipmentBySlugQuery, GetEquipmentBySlugQueryVariables> {
    document = GetEquipmentBySlugDocument;
    
  }
export const GetEventBySlugDocument = gql`
    query GetEventBySlug($slug: String) {
  eventCollection(limit: 1, where: {slug: $slug}) {
    items {
      ssoProtected
      title
      sys {
        id
      }
      title
      slug
      ssoProtected
      searchable
      banner {
        url
      }
      icon {
        url
      }
      summary
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
              sys {
                id
              }
            }
            inline {
              ...PublicFields
              sys {
                id
              }
            }
            hyperlink {
              ...PublicFields
              sys {
                id
              }
            }
          }
          assets {
            block {
              ...AssetFields
            }
            hyperlink {
              ...AssetFields
            }
          }
        }
      }
      keywords
      relatedContactsCollection {
        items {
          ...PublicFields
        }
      }
      relatedOrgsCollection {
        items {
          ...PublicFields
        }
      }
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      callToAction
      audience
      mode
      availability
      date
      capabilities
      location {
        json
      }
      address {
        lat
        lon
      }
    }
  }
}
    ${PublicFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventBySlugGQL extends Apollo.Query<GetEventBySlugQuery, GetEventBySlugQueryVariables> {
    document = GetEventBySlugDocument;
    
  }
export const GetServiceBySlugDocument = gql`
    query GetServiceBySlug($slug: String) {
  serviceCollection(limit: 1, where: {slug: $slug}) {
    items {
      __typename
      sys {
        id
      }
      title
      slug
      ssoProtected
      searchable
      banner {
        title
        description
        url
      }
      icon {
        title
        description
        url
      }
      summary
      callToAction
      callToActionLabel
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
            }
            inline {
              ...PublicFields
            }
            hyperlink {
              ...PublicFields
            }
          }
          assets {
            block {
              title
              description
              url
            }
            hyperlink {
              title
              description
              url
            }
          }
        }
      }
      relatedContactsCollection {
        items {
          ...PublicFields
        }
      }
      relatedOrgsCollection {
        items {
          ...PublicFields
        }
      }
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      audience
      availability
      cost
      access
    }
  }
}
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetServiceBySlugGQL extends Apollo.Query<GetServiceBySlugQuery, GetServiceBySlugQueryVariables> {
    document = GetServiceBySlugDocument;
    
  }
export const GetSoftwareBySlugDocument = gql`
    query GetSoftwareBySlug($slug: String) {
  softwareCollection(limit: 1, where: {slug: $slug}) {
    items {
      __typename
      sys {
        id
      }
      title
      slug
      ssoProtected
      banner {
        url
      }
      summary
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
              sys {
                id
              }
            }
            inline {
              ...PublicFields
              sys {
                id
              }
            }
            hyperlink {
              ...PublicFields
              sys {
                id
              }
            }
          }
          assets {
            block {
              ...AssetFields
            }
            hyperlink {
              ...AssetFields
            }
          }
        }
      }
      relatedContactsCollection {
        items {
          ...PublicFields
          ... on Person {
            email
          }
        }
      }
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      relatedOrgsCollection {
        items {
          ...PublicFields
        }
      }
      searchable
      callToAction
      support {
        ...PublicFields
        ... on Person {
          email
        }
      }
      publisher {
        ...PublicFields
        ... on Person {
          email
        }
      }
      owner {
        ...PublicFields
        ... on Person {
          email
        }
      }
    }
  }
}
    ${PublicFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSoftwareBySlugGQL extends Apollo.Query<GetSoftwareBySlugQuery, GetSoftwareBySlugQueryVariables> {
    document = GetSoftwareBySlugDocument;
    
  }
export const GetSubHubBySlugDocument = gql`
    query GetSubHubBySlug($slug: String) {
  subHubCollection(limit: 1, where: {slug: $slug}) {
    items {
      slug
      title
      summary
      ssoProtected
      searchable
      banner {
        url
      }
      bodyText {
        json
        links {
          entries {
            block {
              ...PublicFields
              sys {
                id
              }
            }
            inline {
              ...PublicFields
              sys {
                id
              }
            }
            hyperlink {
              ...PublicFields
              sys {
                id
              }
            }
          }
          assets {
            block {
              ...AssetFields
            }
            hyperlink {
              ...AssetFields
            }
          }
        }
      }
      keywords
      internalPagesCollection {
        items {
          ...PublicFields
        }
      }
      externalPagesCollection {
        items {
          ...PublicFields
        }
      }
      relatedItemsCollection {
        items {
          ...PublicFields
        }
      }
      viewType
    }
  }
}
    ${PublicFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSubHubBySlugGQL extends Apollo.Query<GetSubHubBySlugQuery, GetSubHubBySlugQueryVariables> {
    document = GetSubHubBySlugDocument;
    
  }
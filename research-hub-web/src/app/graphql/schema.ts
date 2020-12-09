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
  organisationalUnit: Maybe<OrganisationalUnit>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipment: Maybe<Equipment>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudy: Maybe<CaseStudy>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
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
  facility: Maybe<Facility>;
  facilityCollection: Maybe<FacilityCollection>;
  article: Maybe<Article>;
  articleCollection: Maybe<ArticleCollection>;
  officialDocuments: Maybe<OfficialDocuments>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  linkCard: Maybe<LinkCard>;
  linkCardCollection: Maybe<LinkCardCollection>;
  video: Maybe<Video>;
  videoCollection: Maybe<VideoCollection>;
  testContentType: Maybe<TestContentType>;
  testContentTypeCollection: Maybe<TestContentTypeCollection>;
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


export type QueryOrganisationalUnitArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryOrganisationalUnitCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<OrganisationalUnitFilter>;
  order: Maybe<Array<Maybe<OrganisationalUnitOrder>>>;
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


export type QueryFacilityArgs = {
  id: Scalars['String'];
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type QueryFacilityCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  where: Maybe<FacilityFilter>;
  order: Maybe<Array<Maybe<FacilityOrder>>>;
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
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  eventCollection: Maybe<EventCollection>;
  personCollection: Maybe<PersonCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
  officialDocumentsCollection: Maybe<OfficialDocumentsCollection>;
  linkCardCollection: Maybe<LinkCardCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type AssetLinkingCollectionsEventCollectionArgs = {
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


export type AssetLinkingCollectionsFacilityCollectionArgs = {
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


export type AssetLinkingCollectionsOfficialDocumentsCollectionArgs = {
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

export type OrganisationalUnitCollection = {
  __typename?: 'OrganisationalUnitCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
};

/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnit = Entry & {
  __typename?: 'OrganisationalUnit';
  sys: Sys;
  linkedFrom: Maybe<OrganisationalUnitLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<OrganisationalUnitBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  link: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  address: Maybe<Location>;
  relatedItemsCollection: Maybe<OrganisationalUnitRelatedItemsCollection>;
  relatedContactsCollection: Maybe<OrganisationalUnitRelatedContactsCollection>;
  relatedOfferingsCollection: Maybe<OrganisationalUnitRelatedOfferingsCollection>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitAddressArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A unit within the University which provides services, training, or support to
 * researchers at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/organisationalUnit)
 */
export type OrganisationalUnitRelatedOfferingsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type OrganisationalUnitLinkingCollections = {
  __typename?: 'OrganisationalUnitLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  eventCollection: Maybe<EventCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type OrganisationalUnitLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsCaseStudyCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsEventCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsFacilityCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type OrganisationalUnitLinkingCollectionsArticleCollectionArgs = {
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
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type Equipment = Entry & {
  __typename?: 'Equipment';
  sys: Sys;
  linkedFrom: Maybe<EquipmentLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  mainImage: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<EquipmentBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  manufacturer: Maybe<Scalars['String']>;
  model: Maybe<Scalars['String']>;
  yearOfManufacture: Maybe<Scalars['Int']>;
  eligibility: Maybe<EquipmentEligibility>;
  costToUse: Maybe<EquipmentCostToUse>;
  access: Maybe<EquipmentAccess>;
  location: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
  relatedItemsCollection: Maybe<EquipmentRelatedItemsCollection>;
  relatedOrgsCollection: Maybe<EquipmentRelatedOrgsCollection>;
  relatedContactsCollection: Maybe<EquipmentRelatedContactsCollection>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentMainImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentManufacturerArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentModelArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentYearOfManufactureArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentEligibilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentCostToUseArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentAccessArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Hardware, research instruments, or physical equipment used to conduct or support
 * research at UoA. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/equipment)
 */
export type EquipmentRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type EquipmentLinkingCollections = {
  __typename?: 'EquipmentLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type EquipmentLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EquipmentLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type EquipmentLinkingCollectionsFacilityCollectionArgs = {
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

export type SubHubCollection = {
  __typename?: 'SubHubCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHub>>;
};

/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHub = Entry & {
  __typename?: 'SubHub';
  sys: Sys;
  linkedFrom: Maybe<SubHubLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<SubHubBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  internalPagesCollection: Maybe<SubHubInternalPagesCollection>;
  externalPagesCollection: Maybe<SubHubExternalPagesCollection>;
  relatedItemsCollection: Maybe<SubHubRelatedItemsCollection>;
  viewType: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubInternalPagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubExternalPagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Routes to other pages within the Hub, creates an informational hierarchy. See
 * Hub handbook for guidance.  [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/subHub)
 */
export type SubHubViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};

export type SubHubLinkingCollections = {
  __typename?: 'SubHubLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type SubHubLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type SubHubLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type SubHubLinkingCollectionsFacilityCollectionArgs = {
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

/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type Software = Entry & {
  __typename?: 'Software';
  sys: Sys;
  linkedFrom: Maybe<SoftwareLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<SoftwareBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  link: Maybe<Scalars['String']>;
  relatedItemsCollection: Maybe<SoftwareRelatedItemsCollection>;
  relatedContactsCollection: Maybe<SoftwareRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<SoftwareRelatedOrgsCollection>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of a piece of software used for research at UoA and a link to
 * access that software.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/software)
 */
export type SoftwareRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type SoftwareLinkingCollections = {
  __typename?: 'SoftwareLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type SoftwareLinkingCollectionsEntryCollectionArgs = {
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


export type SoftwareLinkingCollectionsFacilityCollectionArgs = {
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
  searchable: Maybe<Scalars['Boolean']>;
  mainImage: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<ServiceBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  link: Maybe<Scalars['String']>;
  relatedOrgsCollection: Maybe<ServiceRelatedOrgsCollection>;
  relatedContactsCollection: Maybe<ServiceRelatedContactsCollection>;
  relatedItemsCollection: Maybe<ServiceRelatedItemsCollection>;
  relatedDocsCollection: Maybe<ServiceRelatedDocsCollection>;
  audience: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
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
export type ServiceSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceMainImageArgs = {
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
export type ServiceBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A service offered by an Org Unit of UoA which researchers may access. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/service) */
export type ServiceLinkArgs = {
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
export type ServiceRelatedContactsCollectionArgs = {
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

export type ServiceLinkingCollections = {
  __typename?: 'ServiceLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type ServiceLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ServiceLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type ServiceLinkingCollectionsArticleCollectionArgs = {
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
  searchable: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<ArticleBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedItemsCollection: Maybe<ArticleRelatedItemsCollection>;
  relatedContactsCollection: Maybe<ArticleRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<ArticleRelatedOrgsCollection>;
  relatedDocsCollection: Maybe<ArticleRelatedDocsCollection>;
  viewType: Maybe<Scalars['String']>;
  relatedItemsTestCollection: Maybe<ArticleRelatedItemsTestCollection>;
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
export type ArticleSearchableArgs = {
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
export type ArticleBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleKeywordsArgs = {
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
export type ArticleRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Piece of rich text optionally supplemented with media for educating/informing. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/article) */
export type ArticleRelatedItemsTestCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type ArticleLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type ArticleLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type ArticleLinkingCollectionsFacilityCollectionArgs = {
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

export type FacilityCollection = {
  __typename?: 'FacilityCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Facility>>;
};

/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type Facility = Entry & {
  __typename?: 'Facility';
  sys: Sys;
  linkedFrom: Maybe<FacilityLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  mainImage: Maybe<Asset>;
  icon: Maybe<Asset>;
  bodyText: Maybe<FacilityBodyText>;
  summary: Maybe<Scalars['String']>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  link: Maybe<Scalars['String']>;
  address: Maybe<Location>;
  relatedItemsCollection: Maybe<FacilityRelatedItemsCollection>;
  relatedEquipmentCollection: Maybe<FacilityRelatedEquipmentCollection>;
  relatedContactsCollection: Maybe<FacilityRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<FacilityRelatedOrgsCollection>;
  audience: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  cost: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilitySlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilitySsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilitySearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityMainImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilitySummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityAddressArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityRelatedEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityAudienceArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityAvailabilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/** A description of a physical space on a UoA campus which researchers may access [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/facility) */
export type FacilityCostArgs = {
  locale: Maybe<Scalars['String']>;
};

export type FacilityLinkingCollections = {
  __typename?: 'FacilityLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type FacilityLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsOrganisationalUnitCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsEquipmentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsSubHubCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsSoftwareCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsServiceCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsFacilityCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type FacilityLinkingCollectionsArticleCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type FacilityBodyText = {
  __typename?: 'FacilityBodyText';
  json: Scalars['JSON'];
  links: FacilityBodyTextLinks;
};


export type FacilityBodyTextLinks = {
  __typename?: 'FacilityBodyTextLinks';
  entries: FacilityBodyTextEntries;
  assets: FacilityBodyTextAssets;
};

export type FacilityBodyTextEntries = {
  __typename?: 'FacilityBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type FacilityBodyTextAssets = {
  __typename?: 'FacilityBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type Location = {
  __typename?: 'Location';
  lat: Maybe<Scalars['Float']>;
  lon: Maybe<Scalars['Float']>;
};

export type FacilityRelatedItemsCollection = {
  __typename?: 'FacilityRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<FacilityRelatedItemsItem>>;
};

export type FacilityRelatedItemsItem = Article | CaseStudy | Event | Facility | Software | SubHub;

/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudy = Entry & {
  __typename?: 'CaseStudy';
  sys: Sys;
  linkedFrom: Maybe<CaseStudyLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<CaseStudyBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  references: Maybe<CaseStudyReferences>;
  relatedItemsCollection: Maybe<CaseStudyRelatedItemsCollection>;
  relatedContactsCollection: Maybe<CaseStudyRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<CaseStudyRelatedOrgsCollection>;
  relatedDocsCollection: Maybe<CaseStudyRelatedDocsCollection>;
  viewType: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudySummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyReferencesArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyRelatedItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyRelatedDocsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A media rich article telling an engaging story, usually describes an example of
 * University research support service in action. [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/caseStudy)
 */
export type CaseStudyViewTypeArgs = {
  locale: Maybe<Scalars['String']>;
};

export type CaseStudyLinkingCollections = {
  __typename?: 'CaseStudyLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type CaseStudyLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type CaseStudyLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type CaseStudyLinkingCollectionsFacilityCollectionArgs = {
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

export type CaseStudyRelatedItemsCollection = {
  __typename?: 'CaseStudyRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type CaseStudyRelatedContactsCollection = {
  __typename?: 'CaseStudyRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CaseStudyRelatedContactsItem>>;
};

export type CaseStudyRelatedContactsItem = Person;

/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type Person = Entry & {
  __typename?: 'Person';
  sys: Sys;
  linkedFrom: Maybe<PersonLinkingCollections>;
  name: Maybe<Scalars['String']>;
  image: Maybe<Asset>;
  role: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonNameArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonImageArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonRoleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonEmailArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonPhoneArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * Information to get in touch with someone [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/person)
 */
export type PersonLinkArgs = {
  locale: Maybe<Scalars['String']>;
};

export type PersonLinkingCollections = {
  __typename?: 'PersonLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  eventCollection: Maybe<EventCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type PersonLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type PersonLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type PersonLinkingCollectionsEventCollectionArgs = {
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


export type PersonLinkingCollectionsFacilityCollectionArgs = {
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

export type EventCollection = {
  __typename?: 'EventCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Event>>;
};

/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type Event = Entry & {
  __typename?: 'Event';
  sys: Sys;
  linkedFrom: Maybe<EventLinkingCollections>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  banner: Maybe<Asset>;
  icon: Maybe<Asset>;
  summary: Maybe<Scalars['String']>;
  bodyText: Maybe<EventBodyText>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection: Maybe<EventRelatedContactsCollection>;
  relatedOrgsCollection: Maybe<EventRelatedOrgsCollection>;
  link: Maybe<Scalars['String']>;
  audience: Maybe<Scalars['String']>;
  mode: Maybe<Scalars['String']>;
  availability: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
  capabilities: Maybe<Scalars['String']>;
  mediaCollection: Maybe<AssetCollection>;
  location: Maybe<Scalars['String']>;
  address: Maybe<Location>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventSlugArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventSsoProtectedArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventSearchableArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventBannerArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventIconArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventBodyTextArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventKeywordsArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventRelatedContactsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventRelatedOrgsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventLinkArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventAudienceArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventModeArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventAvailabilityArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventDateArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventCapabilitiesArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventLocationArgs = {
  locale: Maybe<Scalars['String']>;
};


/**
 * A description of events held within UoA for academic/research development [See type
 * definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/event)
 */
export type EventAddressArgs = {
  locale: Maybe<Scalars['String']>;
};

export type EventLinkingCollections = {
  __typename?: 'EventLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  organisationalUnitCollection: Maybe<OrganisationalUnitCollection>;
  equipmentCollection: Maybe<EquipmentCollection>;
  subHubCollection: Maybe<SubHubCollection>;
  softwareCollection: Maybe<SoftwareCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  facilityCollection: Maybe<FacilityCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type EventLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};


export type EventLinkingCollectionsOrganisationalUnitCollectionArgs = {
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


export type EventLinkingCollectionsFacilityCollectionArgs = {
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
  items: Array<Maybe<OrganisationalUnit>>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

export type CaseStudyRelatedOrgsCollection = {
  __typename?: 'CaseStudyRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
};

export type CaseStudyRelatedDocsCollection = {
  __typename?: 'CaseStudyRelatedDocsCollection';
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

export type OfficialDocumentsLinkingCollections = {
  __typename?: 'OfficialDocumentsLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  caseStudyCollection: Maybe<CaseStudyCollection>;
  serviceCollection: Maybe<ServiceCollection>;
  articleCollection: Maybe<ArticleCollection>;
};


export type OfficialDocumentsLinkingCollectionsEntryCollectionArgs = {
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


export type OfficialDocumentsLinkingCollectionsServiceCollectionArgs = {
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

export type FacilityRelatedEquipmentCollection = {
  __typename?: 'FacilityRelatedEquipmentCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Equipment>>;
};

export type FacilityRelatedContactsCollection = {
  __typename?: 'FacilityRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<FacilityRelatedContactsItem>>;
};

export type FacilityRelatedContactsItem = Person;

export type FacilityRelatedOrgsCollection = {
  __typename?: 'FacilityRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
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

export type ArticleRelatedItemsCollection = {
  __typename?: 'ArticleRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ArticleRelatedItemsItem>>;
};

export type ArticleRelatedItemsItem = Article | CaseStudy | Equipment | Event | Facility | Service | Software | SubHub;

export type ArticleRelatedContactsCollection = {
  __typename?: 'ArticleRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ArticleRelatedContactsItem>>;
};

export type ArticleRelatedContactsItem = Person;

export type ArticleRelatedOrgsCollection = {
  __typename?: 'ArticleRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
};

export type ArticleRelatedDocsCollection = {
  __typename?: 'ArticleRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type ArticleRelatedItemsTestCollection = {
  __typename?: 'ArticleRelatedItemsTestCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ArticleRelatedItemsTestItem>>;
};

export type ArticleRelatedItemsTestItem = Article | CaseStudy | Equipment | Event | Facility | Service | Software | SubHub;

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

export type ServiceRelatedOrgsCollection = {
  __typename?: 'ServiceRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
};

export type ServiceRelatedContactsCollection = {
  __typename?: 'ServiceRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ServiceRelatedContactsItem>>;
};

export type ServiceRelatedContactsItem = Person;

export type ServiceRelatedItemsCollection = {
  __typename?: 'ServiceRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<ServiceRelatedItemsItem>>;
};

export type ServiceRelatedItemsItem = Article | CaseStudy | Event | Facility | Service | Software | SubHub;

export type ServiceRelatedDocsCollection = {
  __typename?: 'ServiceRelatedDocsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
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

export type SoftwareRelatedItemsCollection = {
  __typename?: 'SoftwareRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SoftwareRelatedItemsItem>>;
};

export type SoftwareRelatedItemsItem = Article | CaseStudy | Equipment | Event | Facility | OrganisationalUnit | Service | Software | SubHub;

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
  items: Array<Maybe<OrganisationalUnit>>;
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

export type SubHubInternalPagesItem = Article | CaseStudy | Equipment | Event | Facility | OrganisationalUnit | Service | Software | SubHub;

export type SubHubExternalPagesCollection = {
  __typename?: 'SubHubExternalPagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubExternalPagesItem>>;
};

export type SubHubExternalPagesItem = Article | CaseStudy | SubHub;

export type SubHubRelatedItemsCollection = {
  __typename?: 'SubHubRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<SubHubRelatedItemsItem>>;
};

export type SubHubRelatedItemsItem = Article | CaseStudy | Equipment | Event | Facility | Service | Software | SubHub;

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

export type EquipmentRelatedItemsCollection = {
  __typename?: 'EquipmentRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EquipmentRelatedItemsItem>>;
};

export type EquipmentRelatedItemsItem = Article | CaseStudy | Equipment | Event | Facility | OrganisationalUnit | Service | Software | SubHub;

export type EquipmentRelatedOrgsCollection = {
  __typename?: 'EquipmentRelatedOrgsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnit>>;
};

export type EquipmentRelatedContactsCollection = {
  __typename?: 'EquipmentRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<EquipmentRelatedContactsItem>>;
};

export type EquipmentRelatedContactsItem = Person;

export type OrganisationalUnitBodyText = {
  __typename?: 'OrganisationalUnitBodyText';
  json: Scalars['JSON'];
  links: OrganisationalUnitBodyTextLinks;
};

export type OrganisationalUnitBodyTextLinks = {
  __typename?: 'OrganisationalUnitBodyTextLinks';
  entries: OrganisationalUnitBodyTextEntries;
  assets: OrganisationalUnitBodyTextAssets;
};

export type OrganisationalUnitBodyTextEntries = {
  __typename?: 'OrganisationalUnitBodyTextEntries';
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type OrganisationalUnitBodyTextAssets = {
  __typename?: 'OrganisationalUnitBodyTextAssets';
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type OrganisationalUnitRelatedItemsCollection = {
  __typename?: 'OrganisationalUnitRelatedItemsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnitRelatedItemsItem>>;
};

export type OrganisationalUnitRelatedItemsItem = Article | CaseStudy | SubHub;

export type OrganisationalUnitRelatedContactsCollection = {
  __typename?: 'OrganisationalUnitRelatedContactsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnitRelatedContactsItem>>;
};

export type OrganisationalUnitRelatedContactsItem = Person;

export type OrganisationalUnitRelatedOfferingsCollection = {
  __typename?: 'OrganisationalUnitRelatedOfferingsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OrganisationalUnitRelatedOfferingsItem>>;
};

export type OrganisationalUnitRelatedOfferingsItem = Equipment | Event | Facility | Service;

export type PersonCollection = {
  __typename?: 'PersonCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Person>>;
};

export type OfficialDocumentsCollection = {
  __typename?: 'OfficialDocumentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<OfficialDocuments>>;
};

export type LinkCardCollection = {
  __typename?: 'LinkCardCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<LinkCard>>;
};

/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCard = Entry & {
  __typename?: 'LinkCard';
  sys: Sys;
  linkedFrom: Maybe<LinkCardLinkingCollections>;
  title: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  document: Maybe<Asset>;
};


/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardLinkedFromArgs = {
  allowedLocales: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardTitleArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardSummaryArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardUrlArgs = {
  locale: Maybe<Scalars['String']>;
};


/** Describes links to external sites and their relevance.  [See type definition](https://app.contentful.com/spaces/vbuxn5csp0ik/content_types/linkCard) */
export type LinkCardDocumentArgs = {
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
};

export type LinkCardLinkingCollections = {
  __typename?: 'LinkCardLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type LinkCardLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
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

export type OrganisationalUnitFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  location_exists: Maybe<Scalars['Boolean']>;
  location: Maybe<Scalars['String']>;
  location_not: Maybe<Scalars['String']>;
  location_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  address_exists: Maybe<Scalars['Boolean']>;
  address_within_circle: Maybe<Scalars['Circle']>;
  address_within_rectangle: Maybe<Scalars['Rectangle']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  RelatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOfferingsCollection_exists: Maybe<Scalars['Boolean']>;
  OR: Maybe<Array<Maybe<OrganisationalUnitFilter>>>;
  AND: Maybe<Array<Maybe<OrganisationalUnitFilter>>>;
};



export enum OrganisationalUnitOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
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
  mainImage_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
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
  location_exists: Maybe<Scalars['Boolean']>;
  location: Maybe<Scalars['String']>;
  location_not: Maybe<Scalars['String']>;
  location_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
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
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  ManufacturerAsc = 'manufacturer_ASC',
  ManufacturerDesc = 'manufacturer_DESC',
  ModelAsc = 'model_ASC',
  ModelDesc = 'model_DESC',
  YearOfManufactureAsc = 'yearOfManufacture_ASC',
  YearOfManufactureDesc = 'yearOfManufacture_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
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

export type CaseStudyFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
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

export type EventFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
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
  capabilities_exists: Maybe<Scalars['Boolean']>;
  capabilities: Maybe<Scalars['String']>;
  capabilities_not: Maybe<Scalars['String']>;
  capabilities_in: Maybe<Array<Maybe<Scalars['String']>>>;
  capabilities_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  capabilities_contains: Maybe<Scalars['String']>;
  capabilities_not_contains: Maybe<Scalars['String']>;
  mediaCollection_exists: Maybe<Scalars['Boolean']>;
  location_exists: Maybe<Scalars['Boolean']>;
  location: Maybe<Scalars['String']>;
  location_not: Maybe<Scalars['String']>;
  location_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  location_contains: Maybe<Scalars['String']>;
  location_not_contains: Maybe<Scalars['String']>;
  address_exists: Maybe<Scalars['Boolean']>;
  address_within_circle: Maybe<Scalars['Circle']>;
  address_within_rectangle: Maybe<Scalars['Rectangle']>;
  OR: Maybe<Array<Maybe<EventFilter>>>;
  AND: Maybe<Array<Maybe<EventFilter>>>;
};

export enum EventOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  ModeAsc = 'mode_ASC',
  ModeDesc = 'mode_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  CapabilitiesAsc = 'capabilities_ASC',
  CapabilitiesDesc = 'capabilities_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
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
  image_exists: Maybe<Scalars['Boolean']>;
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

export type SubHubFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  banner_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  internalPagesCollection_exists: Maybe<Scalars['Boolean']>;
  externalPagesCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
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
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
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

export type SoftwareFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
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
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
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
  ssoProtected_exists: Maybe<Scalars['Boolean']>;
  ssoProtected: Maybe<Scalars['Boolean']>;
  ssoProtected_not: Maybe<Scalars['Boolean']>;
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  mainImage_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
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
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FacilityFilter = {
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
  searchable_exists: Maybe<Scalars['Boolean']>;
  searchable: Maybe<Scalars['Boolean']>;
  searchable_not: Maybe<Scalars['Boolean']>;
  mainImage_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  link_exists: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  link_not: Maybe<Scalars['String']>;
  link_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  link_contains: Maybe<Scalars['String']>;
  link_not_contains: Maybe<Scalars['String']>;
  address_exists: Maybe<Scalars['Boolean']>;
  address_within_circle: Maybe<Scalars['Circle']>;
  address_within_rectangle: Maybe<Scalars['Rectangle']>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedEquipmentCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
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
  OR: Maybe<Array<Maybe<FacilityFilter>>>;
  AND: Maybe<Array<Maybe<FacilityFilter>>>;
};

export enum FacilityOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SsoProtectedAsc = 'ssoProtected_ASC',
  SsoProtectedDesc = 'ssoProtected_DESC',
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  AudienceAsc = 'audience_ASC',
  AudienceDesc = 'audience_DESC',
  AvailabilityAsc = 'availability_ASC',
  AvailabilityDesc = 'availability_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
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
  banner_exists: Maybe<Scalars['Boolean']>;
  icon_exists: Maybe<Scalars['Boolean']>;
  summary_exists: Maybe<Scalars['Boolean']>;
  summary: Maybe<Scalars['String']>;
  summary_not: Maybe<Scalars['String']>;
  summary_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains: Maybe<Scalars['String']>;
  summary_not_contains: Maybe<Scalars['String']>;
  keywords_exists: Maybe<Scalars['Boolean']>;
  keywords_contains_all: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_some: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords_contains_none: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedItemsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedContactsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedOrgsCollection_exists: Maybe<Scalars['Boolean']>;
  relatedDocsCollection_exists: Maybe<Scalars['Boolean']>;
  viewType_exists: Maybe<Scalars['Boolean']>;
  viewType: Maybe<Scalars['String']>;
  viewType_not: Maybe<Scalars['String']>;
  viewType_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_not_in: Maybe<Array<Maybe<Scalars['String']>>>;
  viewType_contains: Maybe<Scalars['String']>;
  viewType_not_contains: Maybe<Scalars['String']>;
  relatedItemsTestCollection_exists: Maybe<Scalars['Boolean']>;
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
  SearchableAsc = 'searchable_ASC',
  SearchableDesc = 'searchable_DESC',
  SummaryAsc = 'summary_ASC',
  SummaryDesc = 'summary_DESC',
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

type PublicFields_OrganisationalUnit_Fragment = { __typename: 'OrganisationalUnit', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Equipment_Fragment = { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_SubHub_Fragment = { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Software_Fragment = { __typename: 'Software', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Service_Fragment = { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Article_Fragment = { __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }> };

type PublicFields_Facility_Fragment = { __typename: 'Facility', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_CaseStudy_Fragment = { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_Person_Fragment = { __typename: 'Person', name: Maybe<string> };

type PublicFields_Event_Fragment = { __typename: 'Event', slug: Maybe<string>, title: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean> };

type PublicFields_OfficialDocuments_Fragment = { __typename: 'OfficialDocuments', title: Maybe<string>, summary: Maybe<string> };

type PublicFields_LinkCard_Fragment = { __typename?: 'LinkCard', title: Maybe<string>, summary: Maybe<string>, url: Maybe<string> };

type PublicFields_Video_Fragment = { __typename?: 'Video', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> };

type PublicFields_TestContentType_Fragment = { __typename?: 'TestContentType' };

export type PublicFieldsFragment = PublicFields_OrganisationalUnit_Fragment | PublicFields_Equipment_Fragment | PublicFields_SubHub_Fragment | PublicFields_Software_Fragment | PublicFields_Service_Fragment | PublicFields_Article_Fragment | PublicFields_Facility_Fragment | PublicFields_CaseStudy_Fragment | PublicFields_Person_Fragment | PublicFields_Event_Fragment | PublicFields_OfficialDocuments_Fragment | PublicFields_LinkCard_Fragment | PublicFields_Video_Fragment | PublicFields_TestContentType_Fragment;

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
    )>> }>, caseStudyCollection: Maybe<{ __typename?: 'CaseStudyCollection', items: Array<Maybe<(
      { __typename?: 'CaseStudy' }
      & PublicFields_CaseStudy_Fragment
    )>> }>, equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<(
      { __typename?: 'Equipment' }
      & PublicFields_Equipment_Fragment
    )>> }>, eventCollection: Maybe<{ __typename?: 'EventCollection', items: Array<Maybe<(
      { __typename?: 'Event' }
      & PublicFields_Event_Fragment
    )>> }>, facilityCollection: Maybe<{ __typename?: 'FacilityCollection', items: Array<Maybe<(
      { __typename?: 'Facility' }
      & PublicFields_Facility_Fragment
    )>> }>, organisationalUnitCollection: Maybe<{ __typename?: 'OrganisationalUnitCollection', items: Array<Maybe<(
      { __typename?: 'OrganisationalUnit' }
      & PublicFields_OrganisationalUnit_Fragment
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

export type GetAllSubHubChildPagesSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSubHubChildPagesSlugsQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, internalPagesCollection: Maybe<{ __typename?: 'SubHubInternalPagesCollection', items: Array<Maybe<{ __typename?: 'Article', slug: Maybe<string> } | { __typename?: 'CaseStudy', slug: Maybe<string> } | { __typename?: 'Equipment', slug: Maybe<string> } | { __typename?: 'Event', slug: Maybe<string> } | { __typename?: 'Facility', slug: Maybe<string> } | { __typename?: 'OrganisationalUnit', slug: Maybe<string> } | { __typename?: 'Service', slug: Maybe<string> } | { __typename?: 'Software', slug: Maybe<string> } | { __typename?: 'SubHub', slug: Maybe<string> }>> }> }>> }> };

export type AllSubHubChildPagesQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type AllSubHubChildPagesQuery = { __typename?: 'Query', subHubCollection: Maybe<{ __typename?: 'SubHubCollection', items: Array<Maybe<{ __typename?: 'SubHub', slug: Maybe<string>, title: Maybe<string>, viewType: Maybe<string>, summary: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, sys: { __typename?: 'Sys', id: string }, bodyText: Maybe<{ __typename?: 'SubHubBodyText', json: any }>, internalPagesCollection: Maybe<{ __typename?: 'SubHubInternalPagesCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename?: 'Event' } | { __typename?: 'Facility' } | { __typename?: 'OrganisationalUnit' } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename?: 'Software' } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }> }>> }> };

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetArticleByIdQuery = { __typename?: 'Query', article: Maybe<{ __typename: 'Article', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, viewType: Maybe<string>, sys: { __typename?: 'Sys', id: string }, banner: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'ArticleBodyText', json: any, links: { __typename?: 'ArticleBodyTextLinks', entries: { __typename?: 'ArticleBodyTextEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>> }, assets: { __typename?: 'ArticleBodyTextAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, relatedItemsCollection: Maybe<{ __typename?: 'ArticleRelatedItemsCollection', items: Array<Maybe<(
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
        { __typename?: 'Facility' }
        & PublicFields_Facility_Fragment
      ) | (
        { __typename?: 'Service' }
        & PublicFields_Service_Fragment
      ) | (
        { __typename?: 'Software' }
        & PublicFields_Software_Fragment
      ) | (
        { __typename?: 'SubHub' }
        & PublicFields_SubHub_Fragment
      )>> }>, relatedContactsCollection: Maybe<{ __typename?: 'ArticleRelatedContactsCollection', items: Array<Maybe<(
        { __typename?: 'Person' }
        & PublicFields_Person_Fragment
      )>> }>, relatedOrgsCollection: Maybe<{ __typename?: 'ArticleRelatedOrgsCollection', items: Array<Maybe<(
        { __typename?: 'OrganisationalUnit' }
        & PublicFields_OrganisationalUnit_Fragment
      )>> }>, relatedDocsCollection: Maybe<{ __typename?: 'ArticleRelatedDocsCollection', items: Array<Maybe<(
        { __typename?: 'OfficialDocuments' }
        & PublicFields_OfficialDocuments_Fragment
      )>> }> }> };

export type GetArticleBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetArticleBySlugQuery = { __typename?: 'Query', articleCollection: Maybe<{ __typename?: 'ArticleCollection', items: Array<Maybe<{ __typename?: 'Article', ssoProtected: Maybe<boolean>, title: Maybe<string>, sys: { __typename?: 'Sys', id: string } }>> }> };

export type GetEquipmentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEquipmentByIdQuery = { __typename?: 'Query', equipment: Maybe<{ __typename: 'Equipment', title: Maybe<string>, slug: Maybe<string>, ssoProtected: Maybe<boolean>, searchable: Maybe<boolean>, summary: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, manufacturer: Maybe<string>, model: Maybe<string>, yearOfManufacture: Maybe<number>, link: Maybe<string>, location: Maybe<string>, sys: { __typename?: 'Sys', id: string }, mainImage: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, icon: Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'EquipmentBodyText', json: any, links: { __typename?: 'EquipmentBodyTextLinks', entries: { __typename?: 'EquipmentBodyTextEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
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
        { __typename?: 'Facility' }
        & PublicFields_Facility_Fragment
      ) | (
        { __typename?: 'OrganisationalUnit' }
        & PublicFields_OrganisationalUnit_Fragment
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
        { __typename?: 'OrganisationalUnit' }
        & PublicFields_OrganisationalUnit_Fragment
      )>> }>, eligibility: Maybe<{ __typename?: 'EquipmentEligibility', json: any, links: { __typename?: 'EquipmentEligibilityLinks', entries: { __typename?: 'EquipmentEligibilityEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>> }, assets: { __typename?: 'EquipmentEligibilityAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, costToUse: Maybe<{ __typename?: 'EquipmentCostToUse', json: any, links: { __typename?: 'EquipmentCostToUseLinks', entries: { __typename?: 'EquipmentCostToUseEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>> }, assets: { __typename?: 'EquipmentCostToUseAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }>, access: Maybe<{ __typename?: 'EquipmentAccess', json: any, links: { __typename?: 'EquipmentAccessLinks', entries: { __typename?: 'EquipmentAccessEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit' }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment' }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article' }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility' }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy' }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person' }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event' }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments' }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard' }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video' }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType' }
            & PublicFields_TestContentType_Fragment
          )>> }, assets: { __typename?: 'EquipmentAccessAssets', block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>>, hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string> }>> } } }> }> };

export type GetEquipmentBySlugQueryVariables = Exact<{
  slug: Maybe<Scalars['String']>;
}>;


export type GetEquipmentBySlugQuery = { __typename?: 'Query', equipmentCollection: Maybe<{ __typename?: 'EquipmentCollection', items: Array<Maybe<{ __typename?: 'Equipment', title: Maybe<string>, ssoProtected: Maybe<boolean>, sys: { __typename?: 'Sys', id: string } }>> }> };

export type SubHubChildPagesByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SubHubChildPagesByIdQuery = { __typename?: 'Query', subHub: Maybe<{ __typename?: 'SubHub', title: Maybe<string>, slug: Maybe<string>, summary: Maybe<string>, viewType: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, searchable: Maybe<boolean>, ssoProtected: Maybe<boolean>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }>, bodyText: Maybe<{ __typename?: 'SubHubBodyText', json: any, links: { __typename?: 'SubHubBodyTextLinks', entries: { __typename?: 'SubHubBodyTextEntries', block: Array<Maybe<(
            { __typename?: 'OrganisationalUnit', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_TestContentType_Fragment
          )>>, inline: Array<Maybe<(
            { __typename?: 'OrganisationalUnit', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_TestContentType_Fragment
          )>>, hyperlink: Array<Maybe<(
            { __typename?: 'OrganisationalUnit', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OrganisationalUnit_Fragment
          ) | (
            { __typename?: 'Equipment', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Equipment_Fragment
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
            { __typename?: 'Article', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Article_Fragment
          ) | (
            { __typename?: 'Facility', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Facility_Fragment
          ) | (
            { __typename?: 'CaseStudy', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_CaseStudy_Fragment
          ) | (
            { __typename?: 'Person', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Person_Fragment
          ) | (
            { __typename?: 'Event', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Event_Fragment
          ) | (
            { __typename?: 'OfficialDocuments', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_OfficialDocuments_Fragment
          ) | (
            { __typename?: 'LinkCard', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_LinkCard_Fragment
          ) | (
            { __typename?: 'Video', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_Video_Fragment
          ) | (
            { __typename?: 'TestContentType', sys: { __typename?: 'Sys', id: string } }
            & PublicFields_TestContentType_Fragment
          )>> }, assets: { __typename?: 'SubHubBodyTextAssets', hyperlink: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } }>>, block: Array<Maybe<{ __typename?: 'Asset', title: Maybe<string>, description: Maybe<string>, url: Maybe<string>, sys: { __typename?: 'Sys', id: string } }>> } } }>, internalPagesCollection: Maybe<{ __typename?: 'SubHubInternalPagesCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Event', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Facility', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'OrganisationalUnit', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Software', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }>, externalPagesCollection: Maybe<{ __typename?: 'SubHubExternalPagesCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }>, relatedItemsCollection: Maybe<{ __typename?: 'SubHubRelatedItemsCollection', items: Array<Maybe<{ __typename: 'Article', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string>, banner: Maybe<{ __typename?: 'Asset', url: Maybe<string> }> } | { __typename: 'CaseStudy', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Equipment', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Event', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Facility', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Service', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'Software', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> } | { __typename: 'SubHub', slug: Maybe<string>, title: Maybe<string>, ssoProtected: Maybe<boolean>, summary: Maybe<string> }>> }> }> };

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
    banner {
      title
      description
      url
    }
  }
  ... on CaseStudy {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Equipment {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Event {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on Facility {
    __typename
    slug
    title
    summary
    ssoProtected
    searchable
  }
  ... on OrganisationalUnit {
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
  ... on Software {
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
  ... on OfficialDocuments {
    __typename
    title
    summary
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
  facilityCollection(where: {searchable: true}) {
    items {
      ...PublicFields
    }
  }
  organisationalUnitCollection(where: {searchable: true}) {
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
          ... on Facility {
            slug
          }
          ... on OrganisationalUnit {
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
      bodyText {
        json
      }
      ssoProtected
      searchable
      internalPagesCollection {
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
    keywords
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
    relatedDocsCollection {
      items {
        ...PublicFields
      }
    }
    viewType
  }
}
    ${PublicFieldsFragmentDoc}`;

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
      title
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
    __typename
    sys {
      id
    }
    title
    slug
    ssoProtected
    searchable
    mainImage {
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
    keywords
    manufacturer
    model
    yearOfManufacture
    link
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
    eligibility {
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
    costToUse {
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
    location
    access {
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
    title
    slug
    summary
    viewType
    keywords
    searchable
    ssoProtected
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
          hyperlink {
            title
            description
            sys {
              id
            }
            url
          }
          block {
            title
            description
            sys {
              id
            }
            url
          }
        }
      }
    }
    internalPagesCollection {
      items {
        ... on Article {
          __typename
          slug
          title
          banner {
            url
          }
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
        ... on Event {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on OrganisationalUnit {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Facility {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Software {
          __typename
          slug
          title
          ssoProtected
          summary
        }
      }
    }
    externalPagesCollection {
      items {
        ... on Article {
          __typename
          slug
          title
          banner {
            url
          }
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
        ... on SubHub {
          __typename
          slug
          title
          ssoProtected
          summary
        }
      }
    }
    relatedItemsCollection {
      items {
        ... on Article {
          __typename
          slug
          title
          banner {
            url
          }
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
        ... on Event {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Facility {
          __typename
          slug
          title
          ssoProtected
          summary
        }
        ... on Software {
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
    ${PublicFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SubHubChildPagesByIdGQL extends Apollo.Query<SubHubChildPagesByIdQuery, SubHubChildPagesByIdQueryVariables> {
    document = SubHubChildPagesByIdDocument;
    
  }
import {Person} from './Person';
import {OrgUnit} from './OrgUnit';
import {Policy} from './Policy';
import {GuideCategory} from './GuideCategory';
import {ItemRef} from './ItemRef';
import {ContentType} from './ContentType';


export interface Content {
  id: number;
  name: string;
  summary: string;
  description: string;
  actionableInfo: string;
  additionalInfo: string;
  action: string;
  actionType: ItemRef;
  actionLabel: string;
  image: string;
  orgUnits: Array<OrgUnit>;
  people: Array<Person>;
  policies: Array<Policy>;
  guideCategories: Array<GuideCategory>;
  contentTypes: Array<ContentType>;
}

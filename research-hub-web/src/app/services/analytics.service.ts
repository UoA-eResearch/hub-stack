import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
declare const ga: any;

/**
 * This class represents a standard Google Analytics UX event.
 * It is used by the AnalyticsService to populate a list of known
 * UX events (along with their corresponding actions).
 */
class UXEvent {
    eventLabel: string;
    eventActions: string[];

    constructor(eventLabel: string, ...eventActions: string[]) {
        this.eventLabel = eventLabel;
        this.eventActions = eventActions;
    }
}

@Injectable()
export class AnalyticsService {

  eventCategoryContent = 'Content';
  eventCategoryGuide = 'Guide';
  eventCategoryGuideCategory = 'GuideCategory';
  eventCategoryPerson = 'Person';
  eventCategoryOrgUnit = 'OrgUnit';
  eventCategoryIntegratedService = 'IntegratedService';
  eventCategoryPolicy = 'Policy';
  eventCategoryUserExperience = 'User Experience';

  eventActionView = 'view';
  eventActionClick = 'click';
  eventActionGo = 'go';

  /**
   * This array holds the list of recognized Google Analytics UX events
   * It is populated in the constructor() below.
   */
  readonly UX_EVENTS: UXEvent[] = [];

  constructor () {
    this.initialize();

    /**
     * Register known Google Analytics UX events.
     * These are used to ensure that events are consistently being tracked.
     * A UX event must be registered here to be permitted to be sent to Google Analytics. 
     */
    this.UX_EVENTS.push(new UXEvent('Have you seen', 'click'))
    this.UX_EVENTS.push(new UXEvent('Card view', 'click', 'show card view', 'show list view'));
    this.UX_EVENTS.push(new UXEvent('Sort by', 'sort by alphabetical', 'sort by relevance'));
    this.UX_EVENTS.push(new UXEvent('Home page research activities', 'click'));
    this.UX_EVENTS.push(new UXEvent('Filter panel',
      'open', 'close', 'filter by research activity', 'filter by category',
      'refine by person', 'refine by org unit'));
  }

  // This method needs to be called first to initalise Google Analytics
  private initialize() {
    if (typeof ga === 'undefined') { return; }
    ga('create', environment.analyticsCode, 'auto');
  }

  /**
   * This method first checks whether the event is a known UX event.
   * If so it calls trackEvent(), which then sets the relevant Google Analytics
   * properties and sends the event.
   * @param eventLabel Google Analytics eventLabel
   * @param eventAction Google Analytics eventAction
   */
  trackUserExperience(eventLabel: string, eventAction: string) {
    if(this.isKnownUXEvent(eventLabel, eventAction)) {
      this.trackEvent(this.eventCategoryUserExperience, eventAction, eventLabel);
    } else {
      console.error('This is not a known Google Analytics UX event');
    }
  }

  /**
   * This method checks whether the event about to be sent to Google Analytics
   * is known (has already been registered in the UX_EVENTS constant).
   * @param eventLabel Google Analytics eventLabel
   * @param eventAction Google Analytics eventAction
   */
  isKnownUXEvent(eventLabel: string, eventAction: string) {
    return this.UX_EVENTS
        .filter(x => x.eventLabel === eventLabel)
        .filter(x => x.eventActions.indexOf(eventAction) != -1)
        .length != 0;
  }

  trackContent(name: string, url: string) {
    this.trackEvent(this.eventCategoryContent, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackGuide(name: string, url: string) {
    this.trackEvent(this.eventCategoryGuide, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackGuideCategory(name: string, url: string) {
    this.trackEvent(this.eventCategoryGuideCategory, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackPerson(name: string, url: string) {
    this.trackEvent(this.eventCategoryPerson, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackOrgUnit(name: string, url: string) {
    this.trackEvent(this.eventCategoryOrgUnit, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackPolicy(name: string, url: string) {
    this.trackEvent(this.eventCategoryPolicy, this.eventActionView, name);
    this.trackOutboundLink(url);
  }

  trackSearch(category: string, text: string) {
    const searchUrl = '/search?q=' + text + '&sc=' + category;
    this.trackPageView(searchUrl, 'Search Results');
  }

  trackActionExternal(eventCategory: string, name: string, url: string) {
    this.trackEvent(eventCategory, this.eventActionGo, name);
    this.trackOutboundLink(url);
  }

  trackIntegratedService(name: string, url: string) {
    this.trackEvent(this.eventCategoryIntegratedService, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackActionIntegrated(name: string) {
    this.trackEvent(this.eventCategoryIntegratedService, this.eventActionGo, name);
  }

  trackNoSearchResults(category: string, text: string) {
    const search = category + ':' + text;
    this.trackEvent('No search results', 'search', search);
  }

  // Url is the location from which the feedback / study button was clicked
  trackFeedback(url) {
    this.trackEvent('Feedback', this.eventActionClick, url);
  }

  trackJoinUserStudy(url) {
    this.trackEvent('Join User Study', this.eventActionClick, url);
  }

  trackOutboundLink(url: string) {
    this.trackEvent('Outbound Link', this.eventActionClick, url);
  }

  trackPageView(url: string, title: string) {
    if (typeof ga === 'undefined') { return; }
    ga('set', 'page', url);
    ga('set', 'title', title);
    ga('send', 'pageview');
  }

  trackEvent(eventCategory, eventAction, eventLabel) {
    if (typeof ga === 'undefined') { return; }
    ga('set', 'eventCategory', eventCategory);
    ga('set', 'eventAction', eventAction);
    ga('set', 'eventLabel', eventLabel);
    ga('send', 'event');
  }
}

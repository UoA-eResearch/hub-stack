import { AnalyticsService } from './analytics.service';

describe('Google Analytics service', () => {
    let analyticsService: AnalyticsService;

    const mockUXEventLabel = 'Home page research activities';

    beforeEach(() => {
        analyticsService = new AnalyticsService();
    });


    it('Should return false for an unknown UX event', () => {
        expect(analyticsService.isKnownUXEvent('blah', '')).toBe(false);
    });

    describe("isKnownUXEvent (function)", () => {
        it('Should return true for a known UX event', () => {
            expect(analyticsService.isKnownUXEvent(mockUXEventLabel, analyticsService.eventActionClick)).toBe(true);
        });
    })

    describe("trackUserExperience (function)", () => {
        it('Should not throw an error with invalid input', () => {
            expect(() => analyticsService.trackUserExperience('test', 'test')).not.toThrowError();
        });
    })

    it('Should not throw error when calling track policy valid inputs', () => {
        expect(() => analyticsService.trackPolicy('test', 'test')).not.toThrowError();
    });

    it('Should not throw error when calling track join user study with valid input', () => {
        expect(() => analyticsService.trackJoinUserStudy('test')).not.toThrowError();
    });

    it('Should not throw error when calling track feedback with valid input', () => {
        expect(() => analyticsService.trackFeedback('test')).not.toThrowError();
    });

    it('Should not throw error when calling track outbound link with valid input', () => {
        expect(() => analyticsService.trackJoinUserStudy('test')).not.toThrowError();
    });

    it('Should not throw error when calling track no search results with valid input', () => {
        expect(() => analyticsService.trackNoSearchResults('category', 'text')).not.toThrowError();
    });

    it('Should not throw error when calling trackActionIntegrated results with valid input', () => {
        expect(() => analyticsService.trackActionIntegrated('category')).not.toThrowError();
    });

    describe('trackIntegratedService (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackIntegratedService('category', 'text')).not.toThrowError();
        });
    });

    describe('trackActionExternal (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackActionExternal('event category', 'category', 'text')).not.toThrowError();
        });
    });

    describe('trackSearch (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackSearch('category', 'text')).not.toThrowError();
        });
    });

    describe('trackPerson (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackPerson('text', 'text')).not.toThrowError();
        });
    });

    describe('trackOrgUnit (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackOrgUnit('text', 'text')).not.toThrowError();
        });
    });

    describe('trackGuideCategory (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackGuideCategory('text', 'text')).not.toThrowError();
        });
    });

    describe('trackGuide (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackGuide('text', 'text')).not.toThrowError();
        });
    });

    describe('trackContent (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackContent('text', 'text')).not.toThrowError();
        });
    });

    describe('trackPageView (function)', () => {
        it('Should not throw error when called with valid input', () => {
            expect(() => analyticsService.trackContent('text', 'text')).not.toThrowError();
        });
    });

});

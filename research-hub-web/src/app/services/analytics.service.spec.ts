import { AnalyticsService } from './analytics.service';

describe('Analytics service', () => {
    let analyticsService: AnalyticsService;

    const mockUXEventLabel = 'Home page research activities';

    beforeEach(() => {
        analyticsService = new AnalyticsService();
    });


    it('Should return false for an unknown UX event', () => {
        expect(analyticsService.isKnownUXEvent('blah', '')).toBe(false);
    });

    it('Should return true for a known UX event', () => {
        expect(analyticsService.isKnownUXEvent(mockUXEventLabel, analyticsService.eventActionClick)).toBe(true);
    });

    it('Should throw an error at an invalid UX event', () => {
        expect(analyticsService.trackUserExperience('blah', '')).toThrowError('This is not a known Google Analytics UX event');
    });

    xit('Should return if google analytics type is undefined', () => {
        // expect(analyticsService.trackEvent())
    })

    xit('Should track page view', () => {
    });

});

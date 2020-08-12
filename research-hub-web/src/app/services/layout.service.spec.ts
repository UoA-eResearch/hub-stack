import { LayoutService } from './layout.service';

describe('Layout service', () => {
  let service: LayoutService;

  beforeEach(() => {
    service = new LayoutService();
  });

  describe('get number of grid columns (function)', () => {
    it('Should return 2 columns for an "xs" string', () => {
      expect(service.getNumGridCols('xs')).toBe(2);
    });

    it('Should return 2 columns for a "sm" string', () => {
      expect(service.getNumGridCols('sm')).toBe(2);
    });

    it('Should return 3 columns for a "m" string', () => {
      expect(service.getNumGridCols('md')).toBe(3);
    });

    it('Should return 4 columns for a "l" string', () => {
      expect(service.getNumGridCols('lg')).toBe(4);
    });

    it('Should return 4 columns for a "xl" string', () => {
      expect(service.getNumGridCols('xl')).toBe(4);
    });

    it('Should return 4 columns for a incompatible string', () => {
      expect(service.getNumGridCols('')).toBe(4);
    });
  });

  describe('Get media query alias function (function)', () => {
    it('Should return xs MQ Alias if window width is less than 600px', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(599);
      window.dispatchEvent(new Event('resize'));
      expect(service.getMQAlias()).toBe('xs');
    });

    it('Should return s MQ Alias if window width is 599-959px', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(600);
      window.dispatchEvent(new Event('resize'));
      expect(service.getMQAlias()).toBe('sm');
    });

    it('Should return md MQ Alias if window width is 960-1279px', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(960);
      window.dispatchEvent(new Event('resize'));
      expect(service.getMQAlias()).toBe('md');
    });

    it('Should return lg MQ Alias if window width is 1280-1919px', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1280);
      window.dispatchEvent(new Event('resize'));
      expect(service.getMQAlias()).toBe('lg');
    });

    it('Should return xl MQ Alias if window width is above 1919px', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1920);
      window.dispatchEvent(new Event('resize'));
      expect(service.getMQAlias()).toBe('xl');
    });
  });

  describe('Is width less than (function)', () => {
    it('Should return false when given an invalid media query alias', () => {
      expect(service.isWidthLessThan('xx')).toBe(false);
    });
  });

  describe('Get number of columns for card view search results (function)', () => {
    it('Should return 2 columns for an "xs" string', () => {
      expect(service.getNumGridColsCardResults('xs')).toBe(1);
    });

    it('Should return 2 columns for a "sm" string', () => {
      expect(service.getNumGridColsCardResults('sm')).toBe(2);
    });

    it('Should return 3 columns for a "m" string', () => {
      expect(service.getNumGridColsCardResults('md')).toBe(3);
    });

    it('Should return 3 columns for a "l" string', () => {
      expect(service.getNumGridColsCardResults('lg')).toBe(3);
    });

    it('Should return 3 columns for a "xl" string', () => {
      expect(service.getNumGridColsCardResults('xl')).toBe(3);
    });

    it('Should return 4 columns for a incompatible string', () => {
      expect(service.getNumGridColsCardResults('')).toBe(3);
    });
  });
});

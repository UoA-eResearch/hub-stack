import { LayoutService } from './layout.service';

describe('Layout service', () => {
  let service: LayoutService;

  beforeEach(() => {
    service = new LayoutService();
  });

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

  it('Should return xs MQ Alias if window width is less than small', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(100);
    window.dispatchEvent(new Event('resize'));
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', window.innerWidth);
    expect(service.getMQAlias()).toBe('xs');
  });

});

import { ContentTypeDisplayNamePipe } from './content-type-display-name.pipe'; 

describe('ContentTypeDisplayNamePipe', () => {
  let pipe: ContentTypeDisplayNamePipe;

  beforeEach(() => {
    pipe = new ContentTypeDisplayNamePipe();
  });

  it('Should return correct content display names', () => {
    expect(pipe.transform('article')).toBe('Article');
    expect(pipe.transform('caseStudy')).toBe('Case Study');
    expect(pipe.transform('equipment')).toBe('Equipment');
    expect(pipe.transform('event')).toBe('Event');
    expect(pipe.transform('funding')).toBe('Funding');
    expect(pipe.transform('service')).toBe('Service');
    expect(pipe.transform('software')).toBe('Software');
    expect(pipe.transform('subHub')).toBe('Topic');
  });

  it('Should use human case pipe for any other type', () => {
    expect(pipe.transform('blahBlah')).toBe('Blah Blah');
  })
});

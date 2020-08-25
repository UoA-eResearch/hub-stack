import { HeaderService } from './header.service';

describe('Header service', () => {
    let headerService: HeaderService;

    beforeEach(() => {
        headerService = new HeaderService();
    });

    it('Should emit an observable response with the right title property.', () => {
        headerService.setBatchParams(
            'Welcome to the ResearchHub',
            'The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research.',
            'page-elements/20151005_Science Detail_001_1680x220_BW.jpg',
            true
        );
        headerService.batchParamsChange.subscribe(res => {
            expect(res.title).toBe('Welcome to the ResearchHub');
        })
    })
})
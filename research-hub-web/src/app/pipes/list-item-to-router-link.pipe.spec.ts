import { ListItemToRouterLinkPipe } from "./list-item-to-router-link.pipe";
import { ListItem } from '../model/ListItem';

describe('List item to router link : pipe', () => {
    let pipe: ListItemToRouterLinkPipe;

    beforeEach(() => {
        pipe = new ListItemToRouterLinkPipe();
    });

    const mockListItem = 
        {
            id: 12,
            type: "example",
            title: "example title",
            subtitle: "subtitle",
            image: "image",
            url: "url string",
            categories: ['item1', 'item2', 'item3']
        } as ListItem;

    it('Should return a human case string', () => {
        expect(pipe.transform(mockListItem)).toEqual(['/', 'example', '12']);
    });
});
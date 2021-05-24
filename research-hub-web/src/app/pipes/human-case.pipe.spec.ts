
import { HumanCasePipe } from "./human-case.pipe";

fdescribe('Human case: pipe', () => {
    let pipe: HumanCasePipe;

    beforeEach(() => {
        pipe = new HumanCasePipe();
    });

    it('Should return a human case string', () => {
        expect(pipe.transform('aBcD AAA')).toBe('A Bc D  A A A');
    });
});

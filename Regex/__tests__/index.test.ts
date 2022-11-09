import fn from '../index';
import { AzureContextMock, TestHttpRequest } from '@flyweight.cloud/az-fn-mocks';

describe('The Regex API', () => {
    it('should find all case insensitive matches', async () => {
        const req = new TestHttpRequest({ method: 'POST', url: 'http://test/api/Regex/match' });
        const context = new AzureContextMock({ req });
        context.req.body = {
            content: 'Test, test, and Testing 123!!!',
            regex: 'test',
            flags: 'gi',
        };
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        const expected = {
            matches: ['Test', 'test', 'Test'],
        };
        expect(res.body).toEqual(expected);
    });
    it('should find all case sensitive matches', async () => {
        const req = new TestHttpRequest({ method: 'POST', url: 'http://test/api/Regex/match' });
        const context = new AzureContextMock({ req });
        context.req.body = {
            content: 'Test, test, and Testing 123!!!',
            regex: 'test',
            flags: 'g',
        };
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        const expected = {
            matches: ['test'],
        };
        expect(res.body).toEqual(expected);
    });
    it('should find a single (non-global) match', async () => {
        const req = new TestHttpRequest({ method: 'POST', url: 'http://test/api/Regex/match' });
        const context = new AzureContextMock({ req });
        context.req.body = {
            content: 'Resolution: 800x600',
            regex: '([0-9]+)x([0-9]+)',
        };
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        const expected = {
            matches: ['800x600', '800', '600'],
        };
        expect(res.body).toEqual(expected);
    });
});

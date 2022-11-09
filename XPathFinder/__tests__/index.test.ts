import fn from '../index';
import { AzureContextMock, TestHttpRequest } from '@flyweight.cloud/az-fn-mocks';

describe('The XPathFinder API', () => {
    it('should find single elements', async () => {
        const req = new TestHttpRequest({ method: 'POST', url: 'http://test/api/XPathFinder/findElement' });
        const context = new AzureContextMock({ req });
        context.req.body = {
            content: "<div id='test'><p>Some content you want right <span>here!!!</span></p></div>",
            xpath: '//*[@id="test"]/p/span',
        };
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        const expected = {
            result: {
                name: 'span',
                text: 'here!!!',
            },
        };
        expect(res.body).toEqual(expected);
    });
    it('should find multiple elements', async () => {
        const req = new TestHttpRequest({ method: 'POST', url: 'http://test/api/XPathFinder/findElements' });
        const context = new AzureContextMock({ req });
        context.req.body = {
            content:
                "<div id='test'><p>Some content you want right <span>here</span><span>and here!!!</span></p></div>",
            xpath: '//*[@id="test"]/p/span',
        };
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        expect(res.body.results.length).toEqual(2);
        expect(res.body.results[1]).toEqual({
            name: 'span',
            text: 'and here!!!',
        });
    });
});

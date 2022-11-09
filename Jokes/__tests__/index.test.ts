import fn from '../index';
import { AzureContextMock, TestHttpRequest } from '@flyweight.cloud/az-fn-mocks';

describe('The joke API', () => {
    it('should return a random joke', async () => {
        const req = new TestHttpRequest({ method: 'GET', url: 'http://test/api/Jokes/random' });
        const context = new AzureContextMock({ req });
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        expect(res.body?.content?.length).toBeGreaterThan(0);
        expect(res.status).toEqual(200);
    });

    it('should get a joke by id', async () => {
        const req = new TestHttpRequest({ method: 'GET', url: 'http://test/api/Jokes/get', query: { id: '0' } });
        const context = new AzureContextMock({ req });
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        expect(res.body).toEqual({
            id: '0',
            format: 'QA',
            content: ['Q: Relationship status?', "A: I'll leave the relations to the database."],
        });
        expect(res.status).toEqual(200);
    });
});

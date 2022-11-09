import fn from '../index';
import { AzureContextMock, TestHttpRequest } from '@flyweight.cloud/az-fn-mocks';

describe('The joke API', () => {
    it('should return a null user if user it not set', async () => {
        const req = new TestHttpRequest({ method: 'GET', url: 'http://test/api/WhoAmI/get' });
        const context = new AzureContextMock({ req });
        await fn(context, req);
        const res = context.res;
        if (!res) throw fail('Context did not have a response object');
        expect(res.body).toEqual({ Result: 'Unauthenticated request' });
    });
});

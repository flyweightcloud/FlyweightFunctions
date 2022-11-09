import { Context, HttpRequest } from '@azure/functions';
import Swaggerist, { schemaBuilder, Responses } from '@flyweight.cloud/swaggerist';
import { OpenRoute } from '@flyweight.cloud/openroute';

const swaggerBuilder = Swaggerist.create({
    info: {
        title: 'WhoAmI API',
        description: 'Shows the current authenticated user',
        version: '1.0.0',
    },
});

const app = new OpenRoute({
    swaggerBuilder,
    cors: {
        allowOrigin: '*',
        allowHeaders: ['*'],
        allowMethods: ['*'],
    },
});

const exampleNoUser = {
    Result: 'Unauthenticated request',
};

const exampleUser = {
    type: 'AppService',
    id: 'eeaa88ff-aaaa-4297-ffff-34bd5a97ed61',
    username: 'mark@flyweight.cloud',
    identityProvider: 'aad',
    claimsPrincipalData: {
        auth_typ: 'aad',
        claims: [
            {
                typ: 'aud',
                val: '390a7933-5261-4655-a4a0-581010499cc5',
            },
            {
                typ: 'iss',
                val: 'https://login.microsoftonline.com/b27c81ac-0c29-4f48-a29e-54fb518a84a0/v2.0',
            },
            {
                typ: 'iat',
                val: '1667579575',
            },
            {
                typ: 'exp',
                val: '1667583475',
            },
            {
                typ: 'preferred_username',
                val: 'mark@flyweight.cloud',
            },
            {
                typ: 'ver',
                val: '2.0',
            },
        ],
        name_typ: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        role_typ: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    },
};

const whoAmI = swaggerBuilder.get('/get', {
    operationId: 'whoAmI',
    responses: {
        200: Responses.Success(schemaBuilder(exampleUser)),
        404: Responses.Success(schemaBuilder(exampleNoUser)),
        500: Responses.ServerError,
    },
});

app.route(whoAmI, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    if (req.user) {
        context.res = {
            body: req.user,
            status: 200,
        };
    } else {
        context.res = {
            body: { Result: 'Unauthenticated request' },
            status: 404,
        };
    }
    context.res.headers = openRoute.defaultHeaders();
});

export default app.getHttpTrigger();

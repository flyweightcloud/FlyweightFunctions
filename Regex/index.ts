import { Context, HttpRequest } from '@azure/functions';
import Swaggerist, { schemaBuilder, Responses, bodyParamBuilder } from '@flyweight.cloud/swaggerist';
import { OpenRoute } from '@flyweight.cloud/openroute';

const swaggerBuilder = Swaggerist.create({
    info: {
        title: 'Regex API',
        description: 'Pass in content and a regular expresion and get back matches',
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

const exampleRequest = {
    content: 'Regex is fun and easy; regex is not hard',
    regex: 'regex',
    flags: 'gi',
};

const exampleResponse = {
    matches: ['Regex', 'regex'],
};

const match = swaggerBuilder.post('/match', {
    operationId: 'match',
    parameters: [...bodyParamBuilder('request', exampleRequest)],
    responses: {
        200: Responses.Success(schemaBuilder(exampleResponse)),
        500: Responses.ServerError,
    },
});

app.route(match, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    type body = {
        content?: string;
        regex?: string;
        flags?: string;
    };
    const body = req.body as body;
    context.res.headers = openRoute.defaultHeaders();
    if (!body.content) throw new Error('Must pass in some content to match');
    if (!body.regex) throw new Error('Must pass a regular expression');
    const regex = new RegExp(body.regex, body.flags || '');
    const matches = [...body.content.match(regex)];
    context.res = {
        headers: openRoute.defaultHeaders(),
        status: 200,
    };
    context.res.body = {
        matches,
    };
});

export default app.getHttpTrigger();

import { Context, HttpRequest } from '@azure/functions';
import Swaggerist, { schemaBuilder, Responses, bodyParamBuilder } from '@flyweight.cloud/swaggerist';
import { OpenRoute } from '@flyweight.cloud/openroute';
import * as xpath from 'xpath-html';

const swaggerBuilder = Swaggerist.create({
    info: {
        title: 'XpathFinder API',
        description: 'Get the contetn of an XPath for a given chunk of XHTML',
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
    content: "<div id='test'><p>Some content you want right <span>here!!!</span></p></div>",
    xpath: '//*[@id="test"]/p/span',
};

const exampleElementResponse = {
    result: {
        name: 'span',
        text: 'here!!!',
    },
};

const exampleElementsResponse = {
    results: [exampleElementResponse, exampleElementResponse],
};

const findElements = swaggerBuilder.post('/findElements', {
    operationId: 'findElements',
    parameters: [...bodyParamBuilder('request', exampleRequest)],
    responses: {
        200: Responses.Success(schemaBuilder(exampleElementsResponse)),
        500: Responses.ServerError,
    },
});

app.route(findElements, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    const body = req.body as { content: string; xpath: string };
    context.res.headers = openRoute.defaultHeaders();
    const nodes = xpath.fromPageSource(body.content).findElements(body.xpath);
    context.res = {
        headers: openRoute.defaultHeaders(),
        status: 200,
    };
    if (nodes) {
        context.res.body = {
            results: nodes.map((node) => {
                return {
                    name: node.getTagName(),
                    text: node.getText(),
                };
            }),
        };
    } else {
        context.res.body = { results: [] };
    }
});

const findElement = swaggerBuilder.post('/findElement', {
    operationId: 'findElement',
    parameters: [...bodyParamBuilder('request', exampleRequest)],
    responses: {
        200: Responses.Success(schemaBuilder(exampleElementResponse)),
        500: Responses.ServerError,
    },
});

app.route(findElement, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    const body = req.body as { content: string; xpath: string };
    const node = xpath.fromPageSource(body.content).findElement(body.xpath);
    context.res = {
        headers: openRoute.defaultHeaders(),
        status: 200,
    };
    if (node) {
        context.res.body = {
            result: {
                name: node.getTagName(),
                text: node.getText(),
            },
        };
    } else {
        context.res.body = { result: null };
    }
});

export default app.getHttpTrigger();

import { Context, HttpRequest } from '@azure/functions';
import Swaggerist, {
    schemaBuilder,
    Responses,
    queryParamBuilder,
    SwaggerSecuritySchemes,
} from '@flyweight.cloud/swaggerist';
import { OpenRoute } from '@flyweight.cloud/openroute';
import { HttpError } from '@flyweight.cloud/openroute/lib/errors';
import * as jokeJSON from './jokes.json';

export interface Joke {
    id: string;
    format: string;
    content: string[];
}

const jokes = jokeJSON as Joke[];

const jokeApiResponse = {
    id: '1234',
    format: 'QA',
    content: ['Q: What do you call a busy waiter?', 'A: A server'],
};

const swaggerBuilder = Swaggerist.create({
    info: {
        title: 'Joke API',
        description: 'Flyweights demo joke server',
        version: '1.0.0',
    },
});

if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Production') {
    swaggerBuilder.addSecurityPolicy('oauth', SwaggerSecuritySchemes.MicrosoftOauth());
}

const app = new OpenRoute({
    swaggerBuilder,
    cors: {
        allowOrigin: '*',
        allowHeaders: ['*'],
        allowMethods: ['*'],
    },
});

const getJokeByIdRoute = swaggerBuilder.get('/get', {
    operationId: 'getJokeByID',
    parameters: [...queryParamBuilder({ id: 12345 })],
    responses: {
        200: Responses.Success(schemaBuilder(jokeApiResponse)),
        500: Responses.ServerError,
    },
});

app.route(getJokeByIdRoute, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    if (!req.query.id) {
        throw new HttpError('Please pass in a valid id for the joke', 500);
    }

    const joke = jokes.find((joke) => joke.id === req.query.id);

    context.res = {
        body: joke,
        headers: openRoute.defaultHeaders(),
        status: 200,
    };
});

const getRandomJoke = swaggerBuilder.get('/random', {
    operationId: 'getRandomJoke',
    responses: {
        200: Responses.Success(schemaBuilder(jokeApiResponse)),
        500: Responses.ServerError,
    },
});

app.route(getRandomJoke, (context: Context, req: HttpRequest, openRoute: OpenRoute): void => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    context.res = {
        body: joke,
        headers: openRoute.defaultHeaders(),
        status: 200,
    };
});

export default app.getHttpTrigger();

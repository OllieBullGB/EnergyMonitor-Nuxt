import UrlPattern from 'url-pattern'
import { getUserByApiKey } from "~~/server/db/users";

export default defineEventHandler(async (event) => 
{

    const endpoints =
    [
        '/api/store/*',
        '/api/forecast/*'
    ]

    const isHandledByThisMiddleware = endpoints.some(endpoint => 
    {
        const pattern = new UrlPattern(endpoint)

        return pattern.match(event.req.url)
    })

    if (!isHandledByThisMiddleware) 
    {
        return
    }

    const url = event.node.req.url;
    const urlSplit = url.split('?');
    const query = urlSplit[1];
    if(query === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing apiKey'}))
    }

    const queryParams = query.split('&');

    const sanitisedQueryParams = {};
    queryParams.forEach((param) =>
    {
        let keyValue = param.split('=');
        let key = keyValue[0];
        let value = keyValue[1];
        sanitisedQueryParams[key] = value;
    });

    event.context.query = sanitisedQueryParams;

    //Every auth endpoint requires an apikey
    if (event.context.query.apiKey === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing apiKey,'}))
    }

    //Check if the apikey is valid
    const user = await getUserByApiKey(event.context.query.apiKey);
    if(!user)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'API Key is invalid'}))
    }

    //Add user profiles to the context
    event.context.user = user;
});
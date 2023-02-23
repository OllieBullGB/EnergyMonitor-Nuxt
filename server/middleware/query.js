import UrlPattern from 'url-pattern'

export default defineEventHandler(async (event) => 
{

    const endpoints =
    [
        '/api/forecast/*',
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
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing latitude or longitude'}))
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

    //Every forecast endpoint requires a latitude and longitude
    if (event.context.query.latitude === undefined || event.context.query.longitude === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing latitude or longitude'}))
    }
});
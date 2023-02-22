export default defineEventHandler(async (event) => 
{
    const url = event.node.req.url;
    const query = url.split('?')[1];
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

    // Every endpoint needs a latitude and longitude so we can check in the middleware instead of in every endpoint
    if (event.context.query.latitude === undefined || event.context.query.longitude === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing latitude or longitude'}))
    }
});
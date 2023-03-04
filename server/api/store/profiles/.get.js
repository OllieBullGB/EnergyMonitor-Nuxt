/*
    * @path /api/store/profiles/
    * @method GET
    * @description gets a solar array profile by id
    * @params apiKey, id
    * @returns {Object} {area: float, angle: float, direction: float}
*/

import { sendError } from "h3";
import { getProfile, getProfiles } from "~~/server/db/profiles";

export default defineEventHandler( async (event) => 
{
    
    const id = event.context.query.id;
    const apiKey = event.context.query.apiKey;

    
    if( id === undefined )
    {
        return getProfiles(apiKey);
    }

    const profile = await getProfile(apiKey, id);

    if(!profile)
    {
        return sendError(event, createError({statusCode: 404, statusMessage: 'Profile not found'}))
    }

    if(profile.userId !== event.context.user.id)
    {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Profile does not belong to user'}))
    }

    return {
        body: profile
    }
})
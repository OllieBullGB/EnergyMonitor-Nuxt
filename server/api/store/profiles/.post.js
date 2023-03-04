/*
    * @path /api/store/profiles
    * @method POST
    * @description creates a solar array profile
    * @params apiKey
    * @body {name: string, area: float, angle: float, direction: float}
    * @returns {Object} {area: float, angle: float, direction: float}
*/

import { sendError } from "h3";
import { createProfile } from "~~/server/db/profiles";

export default defineEventHandler( async (event) => 
{
    const body = await readBody(event);

    const { name, area, angle, direction } = body;
    console.log(name, area, angle, direction);

    if( name === undefined || area === undefined || angle === undefined || direction === undefined )
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing name, area, angle or direction'}))
    }

    const apiKey = event.context.query.apiKey;

    const profileData = {
        name: name,
        area: area,
        angle: angle,
        direction: direction
    }

    const profile = await createProfile(apiKey, profileData);

    return {
        body: profile
    }
})
/*
    * @path /api/auth/register
    * @method POST
    * @description Register a new user
    * @body {name: string}
    * @response 200 {user: {id: string, name: string, apiKey: string}}
*/

import { sendError } from "h3";
import { createUser } from "~~/server/db/users";

export default defineEventHandler(async (event) => 
{
    
    const body = await readBody(event);

    const { name } = body;

    if(!name)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing Name'}))
    }

    const user = await createUser(name);

    return {
        body: user
    }
})
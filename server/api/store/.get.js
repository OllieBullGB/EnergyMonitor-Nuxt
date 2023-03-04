/*
    * @path /api/store
    * @method GET
    * @description returns the user and profiles for a given api key
    * @params apiKey
    * @returns {Object} {version: String, lastUpdate: String}
*/

export default defineEventHandler( async (event) => 
{

    const user = event.context.user;

    return {
        "user": user
    }
})
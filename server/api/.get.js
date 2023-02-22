/*
    * @path /api/
    * @method GET
    * @description Returns the current version of the API and the time since last update
    * @returns {Object} {version: String, lastUpdate: String}
*/

import human from 'human-time';
import packageInfo from '../../package.json' assert { type: 'json' };

export default defineEventHandler( async (event) => 
{

    const version = packageInfo.version;
    const lastUpdate = human(new Date(packageInfo.lastUpdate));

    return {
        version,
        lastUpdate
    }
})
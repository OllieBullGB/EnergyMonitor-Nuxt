import { prisma } from './index.js';
import { getUserByApiKey } from './users.js';
import { sendError } from 'h3';

export const createProfile = async (apiKey, profileData) =>
{
    const user = await getUserByApiKey(apiKey)

    if(!user)
    {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
    }

    return prisma.profile.create(
    {
        data:
        {
            ...profileData,
            user:
            {
                connect:
                {
                    id: user.id
                }
            }
        }
    })
}

export const getProfiles = async (apiKey) =>
{
    const user = await getUserByApiKey(apiKey)

    if(!user)
    {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
    }

    return prisma.profile.findMany(
    {
        where:
        {
            userId: user.id
        }
    })
}

export const getProfile = async (apiKey, profileId) =>
{
    const user = await getUserByApiKey(apiKey)
    profileId = parseInt(profileId);

    if(!user)
    {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
    }

    return prisma.profile.findUnique(
    {
        where:
        {
            id: profileId
        }
    })
}
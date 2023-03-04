import { prisma } from './index.js'
import bcrypt from 'bcrypt'

export const createUser = async (name) => 
{
    let apiKey = await bcrypt.hash(name, 10);
    apiKey = apiKey.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    const userData = 
    {
        name: name,
        apiKey: apiKey
    }

    return prisma.user.create({ data: userData });
}

export const getUserByApiKey = async (apiKey) =>
{
    return prisma.user.findUnique(
    { 
        where: 
        { 
            apiKey
        },
        include:
        {
            profiles: true
        }
    });
}
import { it, expect, describe} from 'vitest';

import { createProfile } from "./profiles";
import { getProfiles } from "./profiles";
import { getProfile } from "./profiles";

const apiKey = "2b10crdcZUPRf0OskXApRJQbpunWaqShW9u3VmGWilD2KvxChoyKB0Ui"

describe('getProfile', () => 
{
    it('valid profile id and apiKey should return the expected profile', async () => 
    {
        const profile = await getProfile(apiKey, 1);
        expect(typeof(profile)).toBe('object');
        expect(profile.id).toBe(1);
        expect(profile.name).toBe("Scotland Home Array");
        expect(profile.area).toBe(4);
        expect(profile.angle).toBe(39);
        expect(profile.direction).toBe(0);
        expect(profile.userId).toBe(3);
    });
    
    it('invalid profile id and valid apiKey should return null', async () => 
    {
        const profile = await getProfile(apiKey, 100);
        expect(profile).toBe(null);
    });
    
    it('invalid apiKey should return a sendError', async () =>
    {
        try
        {
            const profile = await getProfile("invalid", 1);
        }
        catch (error)
        {
            expect(error)
        }
    });
    
    it('invalid profile id and invalid apiKey should return a sendError', async () =>
    {
        try
        {
            const profile = await getProfile("invalid", 100);
        }
        catch (error)
        {
            expect(error)
        }
    });
})

describe('getProfiles', () =>
{
    it('valid apiKey should return an array of profiles', async () =>
    {
        const profiles = await getProfiles(apiKey);
        expect(Array.isArray(profiles)).toBe(true);
    });

    it('invalid apiKey should return a sendError', async () =>
    {
        try
        {
            const profiles = await getProfiles("invalid");
        }
        catch (error)
        {
            expect(error)
        }
    });
});

describe('createProfile', () =>
{
    it('valid apiKey and profileData should return the created profile', async () =>
    {
        const profileData = {
            name: "Test Profile",
            area: 4,
            angle: 39,
            direction: 0
        }
        const profile = await createProfile(apiKey, profileData);
        expect(typeof(profile)).toBe('object');
        expect(profile.name).toBe(profileData.name);
        expect(profile.area).toBe(profileData.area);
        expect(profile.angle).toBe(profileData.angle);
        expect(profile.direction).toBe(profileData.direction);
        expect(profile.userId).toBe(3);
    });

    it('invalid apiKey and valid profileData should return a sendError', async () =>
    {
        try
        {
            const profileData = {
                name: "Test Profile",
                area: 4,
                angle: 39,
                direction: 0
            }
            const profile = await createProfile("invalid", profileData);
        }
        catch (error)
        {
            expect(error)
        }
    });

    it('valid apiKey and invalid profileData should return a sendError', async () =>
    {
        try
        {
            const profileData = {
                //missing profile name
                area: 4,
                angle: 39,
                direction: 0
            }
            const profile = await createProfile(apiKey, profileData);
        }
        catch (error)
        {
            expect(error)
        }
    });
});







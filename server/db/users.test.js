import { it, expect, describe} from 'vitest';

import { createUser } from "./users";
import { getUserByApiKey } from "./users";

const apiKey = "2b10crdcZUPRf0OskXApRJQbpunWaqShW9u3VmGWilD2KvxChoyKB0Ui"

describe('getUserByApiKey', () =>
{
    it('valid apiKey should return the expected user', async () =>
    {
        const user = await getUserByApiKey(apiKey);

        expect(typeof(user)).toBe('object');
        expect(user.id).toBe(3);
        expect(user.name).toBe("Steven3");
        expect(user.apiKey).toBe(apiKey);
    });

    it('invalid apiKey should return null', async () =>
    {
        const user = await getUserByApiKey("invalid");
        expect(user).toBe(null);
    });
});

describe('createUser', () =>
{
    it('valid name should create the user with expected apiKey', async () =>
    {
        const user = await createUser("testUser");
        expect(typeof(user)).toBe('object');
        expect(user.id)
        expect(user.name).toBe("testUser");
        expect(user.apiKey)
    });

    it('invalid name should return a sendError', async () =>
    {
        try
        {
            const user = await createUser();
        }
        catch (error)
        {
            expect(error)
        }
    });
});







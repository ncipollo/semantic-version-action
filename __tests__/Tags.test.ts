import { Action } from "../src/Action";
import {GitTags} from "../src/Tags"

describe('Tags', () => {
    it('should always pass', async () => {
        const tags = new GitTags()
        const results = await tags.tags()

        console.log(results)
        // Check the first two since we will add more tags to the repo later.
        expect(results[0]).toBe('v0.0.1')
        expect(results[1]).toBe('v0.0.2')
        expect(results[results.length-1]).not.toBe('')
    })
})
import { TagVersion } from "../src/TagVersion";
import { SemanticVersion } from "../src/SemanticVersion";

describe('TagVersion', () => {
    describe('compare', () => {
        it('returns negative when less than other', () => {
            const versionA = createVersion('1.0.0')
            const versionB = createVersion('1.0.1')

            const result = versionA.compare(versionB)

            expect(result).toBeLessThan(0)
        })

        it('returns positive when more than other', () => {
            const versionA = createVersion('1.0.1')
            const versionB = createVersion('1.0.0')

            const result = versionA.compare(versionB)

            expect(result).toBeGreaterThan(0)
        })

        it('returns zero when same as other', () => {
            const versionA = createVersion('1.0.0')
            const versionB = createVersion('1.0.0')

            const result = versionA.compare(versionB)

            expect(result).toBe(0)
        })
    })

    it('creates creates version using fromTag', () => {
        expect(TagVersion.fromTag('v1.0.0-hotfix')).toEqual(createVersion('v1.0.0-hotfix'))
    })

    function createVersion(tag: string): TagVersion {
        return new TagVersion(tag, SemanticVersion.fromTag(tag))
    }
})
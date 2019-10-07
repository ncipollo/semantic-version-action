import { findPreviousVersion } from "../src/FindPreviousVersion";
import { TagVersion } from "../src/TagVersion";

describe('findPreviousVersion', () => {
    it('returns null if no previous tags', () => {
        const version = TagVersion.fromTag('1.0.0')
        const previousVersion = findPreviousVersion(version, [])
        expect(previousVersion).toBeNull()
    })

    it('returns null if version before earliest tag', () => {
        const version = TagVersion.fromTag('1.0.0')
        const previousVersion = findPreviousVersion(version, ['1.0.1'])
        expect(previousVersion).toBeNull()
    })
    
    it('returns previous version when after latest tag', () => {
        const version = TagVersion.fromTag('v2.0.0')
        const previousVersion = findPreviousVersion(version, ['1.0.0', '1.0.1'])
        expect(previousVersion).toEqual(TagVersion.fromTag('1.0.1'))
    })

    it('returns previous version when in between two tags', () => {
        const version = TagVersion.fromTag('v1.0.0.1')
        const previousVersion = findPreviousVersion(version, ['1.0.0', '1.0.1'])
        expect(previousVersion).toEqual(TagVersion.fromTag('1.0.0'))
    })

    it('returns previous version when tag already exists', () => {
        const version = TagVersion.fromTag('v1.0.1')
        const previousVersion = findPreviousVersion(version, ['1.0.0', '1.0.1'])
        expect(previousVersion).toEqual(TagVersion.fromTag('1.0.0'))
    })
})
import { SemanticVersion, VersionType } from '../src/SemanticVersion'

describe('SemanticVersion', () => {
    describe('creation', () => {
        it('trims prefix', () => {
            const version = SemanticVersion.fromTag('v1.0.0', 'v')
            expect(version).toEqual(expectedVersion(1, 0, 0))
        })

        it('trims suffix', () => {
            const version = SemanticVersion.fromTag('1.0.0.1-stable', '', '-stable')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('trims prefix & suffix', () => {
            const version = SemanticVersion.fromTag('v1.0.0.1-stable', 'v', '-stable')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('trims nothing if prefix and suffix do not exist', () => {
            const version = SemanticVersion.fromTag('1.0.0.1', 'v', 'stable')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('defaults values when omitted', () => {
            const version = SemanticVersion.fromTag('1', 'v', 'stable')
            expect(version).toEqual(expectedVersion(1, 0, 0))
        })
    })

    describe('type', () => {
        it('defaults to major version', () => {
            const version = SemanticVersion.fromTag('0.0.0')
            expect(version.type).toEqual(VersionType.Major)
        })

        it('is major version', () => {
            const version = SemanticVersion.fromTag('1.0.0')
            expect(version.type).toEqual(VersionType.Major)
        })

        it('is minor version', () => {
            const version = SemanticVersion.fromTag('1.1.0')
            expect(version.type).toEqual(VersionType.Major)
        })

        it('is patch version', () => {
            const version = SemanticVersion.fromTag('1.1.1')
            expect(version.type).toEqual(VersionType.Patch)
        })

        it('is micro patch version', () => {
            const version = SemanticVersion.fromTag('1.1.1.1')
            expect(version.type).toEqual(VersionType.MicroPatch)
        })
    })

    describe('toTag', () => {
        it('4 digits', () => {
            const version = SemanticVersion.fromTag('1.1.1.1', 'v', 'stable')
            const tag = version.toTag('v', '-stable', 4)
            expect(tag).toEqual('v1.1.1.1-stable')
        })

        it('3 digits', () => {
            const version = SemanticVersion.fromTag('1.1.1.1', 'v', 'stable')
            const tag = version.toTag('v', '-stable', 3)
            expect(tag).toEqual('v1.1.1-stable')
        })

        it('2 digits', () => {
            const version = SemanticVersion.fromTag('1.1.1.1', 'v', 'stable')
            const tag = version.toTag('v', '-stable', 2)
            expect(tag).toEqual('v1.1-stable')
        })

        it('1 digits', () => {
            const version = SemanticVersion.fromTag('1.1.1.1', 'v', 'stable')
            const tag = version.toTag('v', '-stable', 1)
            expect(tag).toEqual('v1-stable')
        })
    })

    it('is not equal to different versions', () => {
        const version = SemanticVersion.fromTag('v0.0.0', 'v')
        expect(version).not.toEqual(expectedVersion(0, 0, 0, 1))
        expect(version).not.toEqual(expectedVersion(0, 0, 1))
        expect(version).not.toEqual(expectedVersion(0, 1))
        expect(version).not.toEqual(expectedVersion(1))
    })

    function expectedVersion(major: number = 0,
        minor: number = 0,
        patch: number = 0,
        microPath: number = 0): SemanticVersion {
        return new SemanticVersion([major, minor, patch, microPath])
    }
})
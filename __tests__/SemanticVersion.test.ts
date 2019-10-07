import { SemanticVersion, VersionType } from '../src/SemanticVersion'

describe('SemanticVersion', () => {
    describe('creation', () => {
        it('trims prefix', () => {
            const version = SemanticVersion.fromTag('v1.0.0')
            expect(version).toEqual(expectedVersion(1, 0, 0))
        })

        it('trims suffix', () => {
            const version = SemanticVersion.fromTag('1.0.0.1-stable')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('trims prefix & suffix', () => {
            const version = SemanticVersion.fromTag('v1.0.0.1-stable')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('trims nothing if prefix and suffix do not exist', () => {
            const version = SemanticVersion.fromTag('1.0.0.1')
            expect(version).toEqual(expectedVersion(1, 0, 0, 1))
        })

        it('supports multi-digit versions', () => {
            const version = SemanticVersion.fromTag('100.100.100.100')
            expect(version).toEqual(expectedVersion(100, 100, 100, 100))
        })


        it('defaults micro patch', () => {
            const version = SemanticVersion.fromTag('1.0.0')
            expect(version).toEqual(expectedVersion(1))
        })

        it('defaults patch and micro patch', () => {
            const version = SemanticVersion.fromTag('1.0')
            expect(version).toEqual(expectedVersion(1))
        })

        it('defaults minor, patch and micro patch', () => {
            const version = SemanticVersion.fromTag('1')
            expect(version).toEqual(expectedVersion(1))
        })

        it('defaults everything if not a real version', () => {
            const version = SemanticVersion.fromTag('oh, hi')
            expect(version).toEqual(expectedVersion())
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

    it('compare correctly sorts versions', () => {
         const sortedVersions = [
            SemanticVersion.fromTag('0.0.0'),
            SemanticVersion.fromTag('1.0.0'),
            SemanticVersion.fromTag('0.0.1'),
            SemanticVersion.fromTag('0.1.0'),
            SemanticVersion.fromTag('0.1.1'),
            SemanticVersion.fromTag('0.10.1'),
            SemanticVersion.fromTag('1.1.0'),
            SemanticVersion.fromTag('1.0.1'),
            SemanticVersion.fromTag('1.1.1'),
            SemanticVersion.fromTag('0.0.0.1'),
         ].sort((a,b) => a.compare(b))


         const expectedVersions = [
            SemanticVersion.fromTag('0.0.0'),
            SemanticVersion.fromTag('0.0.0.1'),
            SemanticVersion.fromTag('0.0.1'),
            SemanticVersion.fromTag('0.1.0'),
            SemanticVersion.fromTag('0.1.1'),
            SemanticVersion.fromTag('0.10.1'),
            SemanticVersion.fromTag('1.0.0'),
            SemanticVersion.fromTag('1.0.1'),
            SemanticVersion.fromTag('1.1.0'),
            SemanticVersion.fromTag('1.1.1')
         ]

         expect(sortedVersions).toEqual(expectedVersions)
    })

    describe('equals', () => {
        it('is true when versions are same', () => {
            const version = SemanticVersion.fromTag('v1.1.1.1')
            expect(version.equals(expectedVersion(1, 1, 1, 1))).toBeTruthy()
        })

        it('is false when versions are different', () => {
            const version = SemanticVersion.fromTag('v0.0.0')
            expect(version.equals(expectedVersion(0, 0, 0, 1))).toBeFalsy()
            expect(version.equals(expectedVersion(0, 0, 1))).toBeFalsy()
            expect(version.equals(expectedVersion(0, 1))).toBeFalsy()
            expect(version.equals(expectedVersion(1))).toBeFalsy()
        })
    })

    it('toString provides string representation of version', () => {
        const version = SemanticVersion.fromTag('1.1.1.1')
        const tag = version.toString()
        expect(tag).toEqual('1.1.1.1')
    })

    function expectedVersion(major: number = 0,
        minor: number = 0,
        patch: number = 0,
        microPath: number = 0): SemanticVersion {
        return new SemanticVersion([major, minor, patch, microPath])
    }
})
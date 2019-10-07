export class SemanticVersion {
    readonly major: number
    readonly minor: number
    readonly patch: number
    readonly microPatch: number

    static fromTag(tag: string): SemanticVersion {
        const version = this.parseVersionString(tag)
        const versionNumbers = version.split(".").map((part) => parseInt(part))
        return new this(versionNumbers)
    }

    private static parseVersionString(tag: String): string {
        let matches = tag.match('([0-9]+).([0-9]+).([0-9]+).([0-9]+)')
        if (matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+).([0-9]+).([0-9]+)')
        if (matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+).([0-9]+)')
        if (matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+)')
        if (matches) {
            return matches[0]
        }

        return "0.0.0.0"
    }

    constructor(versionNumbers: number[]) {
        [this.major = 0, this.minor = 0, this.patch = 0, this.microPatch = 0] = versionNumbers
    }

    get type(): VersionType {
        if (this.microPatch > 0) {
            return VersionType.MicroPatch
        } else if (this.patch > 0) {
            return VersionType.Patch
        } else if (this.minor > 0) {
            return VersionType.Minor
        } else {
            return VersionType.Major
        }
    }

    compare(other: SemanticVersion): number {
        if (this.major != other.major) {
            return this.major - other.major;
        } else if (this.minor != other.minor) {
            return this.minor - other.minor;
        } else if (this.patch != other.patch) {
            return this.patch - other.patch;
        } else {
            return this.microPatch - other.microPatch;
        }
    }

    equals(other: SemanticVersion): boolean {
        return this.major == other.major
            && this.minor == other.minor
            && this.patch == other.patch
            && this.microPatch == other.microPatch
    }

    toString(): string {
        return `${this.major}.${this.minor}.${this.patch}.${this.microPatch}`
    }
}

export enum VersionType {
    Major = "major",
    Minor = "minor",
    Patch = "patch",
    MicroPatch = "microPatch"
}
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
        if(matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+).([0-9]+).([0-9]+)')
        if(matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+).([0-9]+)')
        if(matches) {
            return matches[0]
        }

        matches = tag.match('([0-9]+)')
        if(matches) {
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
        } else if (this.patch > 0) {
            return VersionType.Minor
        } else {
            return VersionType.Major
        }
    }

    toTag(prefix: string = "", suffix: string = "", digits: number = 3): string {
        if (digits >= 4) {
            return `${prefix}${this.major}.${this.minor}.${this.patch}.${this.microPatch}${suffix}`
        } else if (digits == 3) {
            return `${prefix}${this.major}.${this.minor}.${this.patch}${suffix}`
        } else if (digits == 2) {
            return `${prefix}${this.major}.${this.minor}${suffix}`
        } else {
            return `${prefix}${this.major}${suffix}`
        }
    }

    equals(other: SemanticVersion): boolean {
        return this.major == other.major
            && this.minor == other.minor
            && this.patch == other.patch
            && this.microPatch == other.microPatch
    }
}

export enum VersionType {
    Major,
    Minor,
    Patch,
    MicroPatch
}
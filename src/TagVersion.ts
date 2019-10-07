import { SemanticVersion } from "./SemanticVersion"

export class TagVersion {
    readonly tag: string
    readonly version: SemanticVersion

    static fromTag(tag: string): TagVersion {
        return new TagVersion(tag, SemanticVersion.fromTag(tag))
    }

    constructor(tag: string, version: SemanticVersion) {
        this.tag = tag
        this.version = version
    }

    compare(other: TagVersion): number {
        return this.version.compare(other.version);
    }
}
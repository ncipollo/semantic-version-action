import { SemanticVersion } from "./SemanticVersion"

export class TagVersion {
    readonly tag: string
    readonly version: SemanticVersion

    constructor(tag: string, version: SemanticVersion) {
        this.tag = tag
        this.version = version
    }

    compare(other: TagVersion): number {
        return this.version.compare(other.version);
    }
}
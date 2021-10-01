"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagVersion = void 0;
const SemanticVersion_1 = require("./SemanticVersion");
class TagVersion {
    constructor(tag, version) {
        this.tag = tag;
        this.version = version;
    }
    static fromTag(tag) {
        return new TagVersion(tag, SemanticVersion_1.SemanticVersion.fromTag(tag));
    }
    compare(other) {
        return this.version.compare(other.version);
    }
}
exports.TagVersion = TagVersion;

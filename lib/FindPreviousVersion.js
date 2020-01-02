"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagVersion_1 = require("./TagVersion");
function findPreviousVersion(version, tags) {
    const versions = tagsToVersion(tags);
    addVersionIfNeeded(version, versions);
    versions.sort((a, b) => a.compare(b));
    const index = versions.findIndex((value, _index, _array) => {
        return value.version.equals(version.version);
    });
    if (index > 0) {
        return versions[index - 1];
    }
    else {
        return null;
    }
}
exports.findPreviousVersion = findPreviousVersion;
function tagsToVersion(tags) {
    return tags.map((tags) => TagVersion_1.TagVersion.fromTag(tags));
}
function addVersionIfNeeded(version, versions) {
    const index = versions.findIndex((value, _index, _array) => {
        return value.version.equals(version.version);
    });
    if (index == -1) {
        versions.push(version);
    }
}

import { TagVersion } from './TagVersion'
import { SemanticVersion } from './SemanticVersion'

export function findPreviousVersion(version: TagVersion, tags: string[]): TagVersion | null {
    const versions = tagsToVersion(tags)
    addVersionIfNeeded(version, versions)
    versions.sort((a, b) => a.compare(b))

    const index = versions.findIndex((value, _index, _array) => {
        return value.version.equals(version.version)
    })

    if (index > 0) {
        return versions[index - 1]
    } else {
        return null
    }
}

function tagsToVersion(tags: string[]): TagVersion[] {
    return tags.map((tags) => TagVersion.fromTag(tags))
}

function addVersionIfNeeded(version: TagVersion, versions: TagVersion[]) {
    const index = versions.findIndex((value, _index, _array) => {
        return value.version.equals(version.version)
    })
    if (index == -1) {
        versions.push(version)
    }
}
import {TagVersion} from './TagVersion'

export function findPreviousVersion(version: TagVersion, tags: string[]): TagVersion | null {
    const versions = tagsToVersion(tags)
    versions.push(version)
    versions.sort((a,b) => a.compare(b))

    const index = versions.findIndex((value,_index,_array) => value == version)
    if(index > 0) {
        return versions[index - 1]
    } else {
        return null
    }
}

function tagsToVersion(tags: string[]): TagVersion[] {
    return tags.map((tags) => TagVersion.fromTag(tags))
}
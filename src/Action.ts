import * as core from '@actions/core';
import { Inputs } from "./Inputs";
import { Tags } from "./Tags";
import { TagVersion } from "./TagVersion";
import { findPreviousVersion } from "./FindPreviousVersion";

export class Action {
    inputs: Inputs
    tags: Tags

    constructor(inputs: Inputs, tags: Tags) {
        this.inputs = inputs
        this.tags = tags
    }

    async perform() {
        const version = TagVersion.fromTag(this.inputs.tag)
        const allTags = await this.tags.tags()

        const previousVersion = findPreviousVersion(version, allTags)

        this.outputVersionInfo(version)
        this.outputPreviousTag(previousVersion)
    }

    private outputVersionInfo(version: TagVersion) {
        core.setOutput('tag', version.tag)

        core.setOutput('major', version.version.major.toString())
        core.setOutput('minor', version.version.minor.toString())
        core.setOutput('patch', version.version.patch.toString())
        core.setOutput('microPatch', version.version.microPatch.toString())
        core.setOutput('type', version.version.type.toString())
    }

    private outputPreviousTag(previousVersion: TagVersion | null) {
        if (previousVersion) { 
            core.setOutput('previousTag', previousVersion.tag)
        }
    }
}
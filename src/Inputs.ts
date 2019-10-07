import { Context } from "@actions/github/lib/context";
import * as core from '@actions/core';

export interface Inputs {
    readonly tag: string
}

export class CoreInputs implements Inputs {
    private context: Context

    constructor(context: Context) {
        this.context = context
    }

    get tag(): string {
        const tag = core.getInput('tag')
        if (tag) {
            return tag;
        }

        const ref = this.context.ref
        const tagPath = "refs/tags/"
        if (ref && ref.startsWith(tagPath)) {
            return ref.substr(tagPath.length, ref.length)
        }

        throw Error("No tag found in ref or input!")
    }
}
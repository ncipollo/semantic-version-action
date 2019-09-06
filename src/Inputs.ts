import { Context } from "@actions/github/lib/context";
import * as core from '@actions/core';

export interface Inputs {
    readonly baseBranch: string
    readonly outputFile:string
    readonly tag: string
    readonly token: string
}

export class CoreInputs implements Inputs {
    private context: Context

    constructor(context: Context) {
        this.context = context
    }

    get baseBranch(): string {
        return core.getInput('baseBranch')
    }

    get outputFile(): string {
        return core.getInput('outputFile')
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

    get token(): string {
        return core.getInput('token', { required: true })
    }
}
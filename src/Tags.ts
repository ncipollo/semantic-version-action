import {exec} from '@actions/exec';

export interface Tags {
    tags(): Promise<string[]>
}

export class GitTags implements Tags {
    async tags(): Promise<string[]> {
        let outputString = ""
        const options = {
            listeners: {
                stdout: (data:Buffer) => outputString += data.toString()
            }
        }
        await exec('git', ['tag'], options)
        return outputString.split('\n').filter((tag) => tag.length > 0);
    }
}
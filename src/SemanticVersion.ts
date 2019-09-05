class SemanticVersion {
    readonly major: number
    readonly minor: number
    readonly patch: number
    readonly microPatch: number

    static fromTag(tag: string, tagPrefix: string = "", tagSuffix: string = "") {
        const tagWithoutPrefix = this.trimPrefix(tag, tagPrefix)
        const version = this.trimSuffix(tag, tagSuffix)
        const versionNumbers = version.split(".").map((part) => parseInt(part))
    }

    private constructor(versionNumbers: number[]) {
        [this.major = 0, this.minor = 0, this.patch = 0, this.microPatch = 0] = versionNumbers
    }

    private static trimPrefix(text: string, prefix: string): string {
        if (text && prefix && text.startsWith(prefix)) {
            return text.substr(prefix.length, text.length)
        }
        return text
    }

    private static trimSuffix(text: string, suffix: string): string {
        if (text && suffix && text.endsWith(suffix)) {
            return text.substr(0, suffix.length)
        }
        return text
    }
}
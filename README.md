# Semantic Version Action

This action may be used to generate semantic version information about a tag. The action will output
the following information:
- Semantic version information derived from the tag (major version, minor version, etc)
- The tag which represents the most recent semantic version before the tag provided to the action.

## Action Inputs

- **tag**: An optional tag to be used for comparison. If this is omitted the git ref will be used (if it is a tag).

## Action Outputs
- **tag**: The input tag provided to the action. This is primarily provided for convenience.
- **major**: The major part of the semantic version. For `1.2.3` the major part would be `1`.
- **minor**: The minor part of the semantic version. For `1.2.3` the minor part would be `2`.
- **patch**: The minor part of the semantic version. For `1.2.3` the patch part would be `3`.
- **micro_patch**: The micro patch part of the semantic version. This is not technically part of the semantic version scheme but some organization utilize this (especially for pre-release versions). For `1.2.3.4` the microPatch part would be `4`.
- **type**: The type of version. This will be one of the following: `major`, `minor`, `patch` or `micro_patch`. The lowest version digit takes precedence. For example the type of `1.0.0.1` would be `micro_patch`.
- **previous_tag**: The tag which represents the most recent semantic version before the tag provided to the action. For example, if a project has the following tags: `1.0.0` and `1.1.0`, and the current tag is `1.0.1`, the `previousTag` would be `1.0.0`. This can be used to generate diff between a new tag and the previously released version.

## Example

```yml
name: Action
```

## Notes


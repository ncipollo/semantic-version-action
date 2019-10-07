const mockSetOutput = jest.fn();

import { Action } from "../src/Action";
import { Inputs } from "../src/Inputs";
import { Tags } from "../src/Tags";

jest.mock('@actions/core', () => {
    return { setOutput: mockSetOutput };
})

describe('Action', () => {
    it('sets correct output for new tag with existing tags', async () => {
        const action = createAction()

        await action.perform()

        expect(mockSetOutput).toBeCalledWith('tag', '1.0.1.1')
        expect(mockSetOutput).toBeCalledWith('major', '1')
        expect(mockSetOutput).toBeCalledWith('minor', '0')
        expect(mockSetOutput).toBeCalledWith('patch', '1')
        expect(mockSetOutput).toBeCalledWith('microPatch', '1')
        expect(mockSetOutput).toBeCalledWith('type', 'microPatch')
        expect(mockSetOutput).toBeCalledWith('previousTag', 'v1.0.0')
    })

    it('sets correct output for new tag without existing tags', async () => {
        const action = createAction('0.1.0', [])

        await action.perform()

        expect(mockSetOutput).toBeCalledWith('tag', '0.1.0')
        expect(mockSetOutput).toBeCalledWith('major', '0')
        expect(mockSetOutput).toBeCalledWith('minor', '1')
        expect(mockSetOutput).toBeCalledWith('patch', '0')
        expect(mockSetOutput).toBeCalledWith('microPatch', '0')
        expect(mockSetOutput).toBeCalledWith('type', 'minor')
        expect(mockSetOutput).not.toBeCalledWith('previousTag', 'v1.0.0')
    })

    function createAction(newTag: string = '1.0.1.1', tagStrings = ['v1.1.0', 'v1.0.0']): Action {
        const MockInputs = jest.fn<Inputs, any>(() => {
            return {
                tag: newTag
            }
        })
        const MockTags = jest.fn<Tags, any>(() => {
            return {
                tags: () => Promise.resolve(tagStrings)
            }
        })
        const inputs = new MockInputs()
        const tags = new MockTags()
        return new Action(inputs, tags)
    }
})
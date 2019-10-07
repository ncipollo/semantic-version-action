const mockGetInput = jest.fn();

import { Context } from "@actions/github/lib/context";
import { Inputs, CoreInputs } from "../src/Inputs";

jest.mock('@actions/core', () => {
    return { getInput: mockGetInput };
})

describe('Inputs', () => {
    let context: Context;
    let inputs: Inputs;
    beforeEach(() => {
        mockGetInput.mockReset()
        context = new Context()
        inputs = new CoreInputs(context)
    })

    describe('tag', () => {
        it('returns input tag', () => {
            mockGetInput.mockReturnValue('tag')
            expect(inputs.tag).toBe('tag')
        })
        it('returns context sha when input is empty', () => {
            mockGetInput.mockReturnValue('')
            context.ref = 'refs/tags/sha-tag'
            expect(inputs.tag).toBe('sha-tag')
        })
        it('returns context sha when input is null', () => {
            mockGetInput.mockReturnValue(null)
            context.ref = 'refs/tags/sha-tag'
            expect(inputs.tag).toBe('sha-tag')
        })
        it('throws if no tag', () => {
            expect(() => inputs.tag).toThrow()
        })
    })
})
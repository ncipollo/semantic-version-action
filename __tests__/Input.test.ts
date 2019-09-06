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

    it('returns baseBranch', () => {
        mockGetInput.mockReturnValue('master')
        expect(inputs.baseBranch).toBe('master')
    })

    it('returns outputFile', () => {
        mockGetInput.mockReturnValue('version-diff.json')
        expect(inputs.outputFile).toBe('version-diff.json')
    })

    it('returns token', () => {
        mockGetInput.mockReturnValue('42')
        expect(inputs.token).toBe('42')
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
import * as github from '@actions/github';
import * as core from '@actions/core';
import { Action } from './Action';
import { CoreInputs } from './Inputs';
import { GitTags } from './Tags';

async function run() {
  try {
    const action = createAction()
    await action.perform()
  } catch (error) {
    core.setFailed(error.message);
  }
}

function createAction(): Action {
  const inputs = new CoreInputs(github.context)
  const tags = new GitTags()
  return new Action(inputs, tags)
}

run();

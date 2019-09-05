import * as github from '@actions/github';
import * as core from '@actions/core';
import { Action } from './Action';

async function run() {
  try {
    const action = createAction()
    await action.perform()
  } catch (error) {
    core.setFailed(error.message);
  }
}

function createAction(): Action {
  return new Action()
}

run();

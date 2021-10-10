import { BuildAction, DispatchType } from '../type'
import * as actionTypes from './actionTypes'

export function addBuild(commit: string) {
  const action: BuildAction = {
    type: actionTypes.ADD_BUILD,
    payload: commit,
  }

  return simulateHttpRequest(action)
}

export function removeBuild(commit: string) {
  const action: BuildAction = {
    type: actionTypes.REMOVE_BUILD,
    payload: commit,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: BuildAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}

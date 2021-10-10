import { BuildState, IBuild, BuildAction } from '../type'
import * as actionTypes from './actionTypes'

const initialState: BuildState = {
  builds: [
    {
      status: 'ok',
      buildNum: 1234,
      branch: 'master',
      commit: '9c9f0b9',
      description: 'add documentation for postgres scaler',
      user: 'Philip Kirkorov',
      date: new Date(),
      durationSeconds: 80 * 60,
    },
    {
      status: 'pending',
      buildNum: 1189,
      branch: 'super-cool-ui-kit',
      commit: 'b4636ab',
      description: "Merge branch 'master' of github.com:jaywcjlove/awesome",
      user: 'Vadim Makeev',
      date: new Date(),
      durationSeconds: 80 * 60,
    },
    {
      status: 'fail',
      buildNum: 1174,
      branch: 'master',
      commit: 'b4636ab',
      description: 'upgrade typescript to 3.8',
      user: 'Philip Kirkorov',
      date: new Date(),
      durationSeconds: 80 * 60,
    },
  ],
}

const reducer = (
  state: BuildState = initialState,
  action: BuildAction,
): BuildState => {
  switch (action.type) {
    case actionTypes.ADD_BUILD:
      const newBuild: IBuild =
        initialState.builds[
          Math.floor(Math.random() * initialState.builds.length)
        ]
      newBuild.commit = action.payload
      newBuild.date = new Date()
      return {
        ...state,
        builds: [newBuild, ...state.builds],
      }
    case actionTypes.REMOVE_BUILD:
      const updatedBuilds: IBuild[] = state.builds.filter(
        (build) => build.commit !== action.payload,
      )
      return {
        ...state,
        builds: updatedBuilds,
      }
  }
  return state
}

export default reducer

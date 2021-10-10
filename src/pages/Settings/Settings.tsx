import React, { useReducer } from 'react'
import { useHistory } from 'react-router'

import Footer from '../../areas/Footer/Footer'
import HeaderCI from '../../areas/HeaderCI/HeaderCI'
import FormField from '../../components/FormField/FormField'
import FormInteger from '../../components/FormInteger/FormInteger'
import Button from '../../components/Button/Button'
import { isDigit } from '../../common/isDigit'

import './Settings.css'

interface Props {}

type SettingsState = {
  githubRepo: string
  buildCmd: string
  mainBranch: string
  syncInterval: string
}

type ExtendedSettingsState = SettingsState & { withErrors: boolean }

const initialState: ExtendedSettingsState = {
  githubRepo: '',
  buildCmd: '',
  mainBranch: '',
  syncInterval: '',
  withErrors: false,
}

type Action =
  | { type: 'CHANGE_INPUT'; field: keyof SettingsState; payload: string }
  | { type: 'CLEAR_INPUT'; field: keyof SettingsState }
  | { type: 'SET_WITH_ERRORS' }

function reducer(state: ExtendedSettingsState, action: Action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, withErrors: false, [action.field]: action.payload }

    case 'CLEAR_INPUT':
      return { ...state, withErrors: false, [action.field]: '' }

    case 'SET_WITH_ERRORS':
      return { ...state, withErrors: true }

    default:
      return state
  }
}

const Settings = (props: Props) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleChange = (field: keyof SettingsState) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'CHANGE_INPUT',
        field,
        payload: e.target.value,
      })
  }

  const handleClear = (field: keyof SettingsState) => {
    return () =>
      dispatch({
        type: 'CLEAR_INPUT',
        field,
      })
  }
  const validate = () => {
    if (
      state.buildCmd === '' ||
      state.githubRepo === '' ||
      state.mainBranch === '' ||
      (state.syncInterval && !isDigit(state.syncInterval))
    ) {
      dispatch({ type: 'SET_WITH_ERRORS' })
      return false
    } else {
      return true
    }
  }

  const runBuildHandler = () => {
    if (validate()) {
      localStorage.setItem('startScreen', 'false')
      history.push('/')
    }
  }
  console.log(state)
  return (
    <div className="p-settings">
      <HeaderCI cls="container" />
      <main className="container p-settings_main">
        <div>
          <h2 className="p-settings_title">Settings</h2>
          <p className="p-settings_description">
            Configure repository connection and synchronization settings.
          </p>
        </div>
        <FormField
          text="GitHub repository"
          placeholder="user-name/repo-name"
          onChange={handleChange('githubRepo')}
          onClear={handleClear('githubRepo')}
          withError={state.withErrors && state.githubRepo === ''}
          required
        />
        <FormField
          text="Build command"
          placeholder="npm ci && npm run build"
          onChange={handleChange('buildCmd')}
          onClear={handleClear('buildCmd')}
          withError={state.withErrors && state.buildCmd === ''}
          required
        />
        <FormField
          text="Main branch"
          placeholder="master |"
          onChange={handleChange('mainBranch')}
          onClear={handleClear('mainBranch')}
          withError={state.withErrors && state.mainBranch === ''}
          required
        />
        <FormInteger
          leftText="Synchronize every"
          rightText="minutes"
          placeholder="10"
          onChange={handleChange('syncInterval')}
          withError={
            state.withErrors &&
            state.syncInterval !== '' &&
            !isDigit(state.syncInterval)
          }
        />
        <div className="p-settings_buttons">
          <Button onClick={runBuildHandler} type="action">
            Save
          </Button>
          <Button onClick={() => history.goBack()}>Cancel</Button>
        </div>
      </main>
      <Footer cls="container" />
    </div>
  )
}

export default Settings

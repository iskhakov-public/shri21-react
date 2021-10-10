import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StartScreen from './pages/StartScreen/StartScreen'
import Settings from './pages/Settings/Settings'
import BuildHistory from './pages/BuildHistory/BuildHistory'

function App() {
  const renderIndex = (props: any) =>
    localStorage.getItem('startScreen') === 'false' ? (
      <BuildHistory {...props} />
    ) : (
      <StartScreen {...props} />
    )
  const renderSettings = (props: any) => <Settings {...props} />

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={renderIndex} />
          <Route path="/settings" render={renderSettings} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

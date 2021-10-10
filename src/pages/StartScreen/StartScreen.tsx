import React from 'react'

import Footer from '../../areas/Footer/Footer'
import HeaderCI from '../../areas/HeaderCI/HeaderCI'
import StartEmptyMain from '../../areas/StartEmptyMain/StartEmptyMain'
import { ActionType } from '../../components/ActionButton/ActionButton'

import './StartScreen.css'

interface Props {}

const StartScreen = (props: Props) => {
  let isStart = true
  const actions = [
    {
      action: ActionType.Run,
      onClick: () => console.log('click'),
    },
  ]
  return (
    <div className="p-start-screen">
      <HeaderCI cls="container" actions={actions} />
      <main className="container p-start-screen_main">
        {isStart && <StartEmptyMain cls="p-start-screen_start-empty-main" />}
      </main>
      <Footer cls="container" />
    </div>
  )
}

export default StartScreen

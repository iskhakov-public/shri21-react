import React, { useState } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'

import Footer from '../../areas/Footer/Footer'
import HeaderCI from '../../areas/HeaderCI/HeaderCI'
import BuildCard, { BuildInfo } from '../../components/BuildCard/BuildCard'
import ModalRun from '../../components/ModalRun/ModalRun'
import { ActionType } from '../../components/ActionButton/ActionButton'

import './BuildHistory.css'
import Button from '../../components/Button/Button'
import { element } from 'prop-types'

interface Props {}

let buildInfo: BuildInfo[] = [
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
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
}

const BuildHistory = (props: Props) => {
  const [buildstate, setBuildstate] = useState(buildInfo)
  const [showNum, setShowNum] = useState(8)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()

  let isStart = true
  const actions = [
    {
      action: ActionType.Run,
      onClick: () => setIsOpen(true),
    },
    {
      action: ActionType.Settings,
      onClick: () => history.push('/settings'),
      collapsed: true,
    },
  ]

  const handleShowMoreClick = async () => {
    setShowNum(showNum + 3)
  }

  const handleRunBuild = (hash: string) => {
    const newBuild = buildInfo[Math.floor(Math.random() * buildInfo.length)]
    newBuild.commit = hash
    newBuild.date = new Date()
    setBuildstate([newBuild, ...buildstate])
  }

  return (
    <div className="p-build-history">
      <HeaderCI
        cls="container"
        actions={actions}
        textCls="p-build-history_title"
        text="philip1967/my-awesome-repo"
      />
      <main className="container p-build-history_main">
        {buildstate
          .map((elem) => (
            <BuildCard cls="p-build-history_build" buildInfo={elem} />
          ))
          .slice(0, showNum)}
        {showNum < buildstate.length && (
          <Button
            onClick={handleShowMoreClick}
            cls="p-build-history_show-more-btn"
          >
            Show more
          </Button>
        )}
      </main>
      <Footer cls="container" />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        overlayClassName="p-build-history_overlay-modal"
        contentLabel="Example Modal"
      >
        <ModalRun
          onRunBuild={handleRunBuild}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default BuildHistory

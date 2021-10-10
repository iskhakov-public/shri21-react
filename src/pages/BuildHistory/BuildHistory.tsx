import React, { useState, useCallback } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { BuildState, IBuild } from '../../type'
import Footer from '../../areas/Footer/Footer'
import HeaderCI from '../../areas/HeaderCI/HeaderCI'
import BuildCard from '../../components/BuildCard/BuildCard'
import ModalRun from '../../components/ModalRun/ModalRun'
import Button from '../../components/Button/Button'
import { ActionType } from '../../components/ActionButton/ActionButton'
import { addBuild } from '../../store/actionCreators'

import './BuildHistory.css'

interface Props {}

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
  const dispatch: Dispatch<any> = useDispatch()
  const [showNum, setShowNum] = useState(8)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()

  const builds: readonly IBuild[] = useSelector(
    (state: BuildState) => state.builds,
    shallowEqual,
  )

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

  const handleRunBuild = useCallback(
    (commitHash: string) => dispatch(addBuild(commitHash)),
    [dispatch, addBuild],
  )

  return (
    <div className="p-build-history">
      <HeaderCI
        cls="container"
        actions={actions}
        textCls="p-build-history_title"
        text="philip1967/my-awesome-repo"
      />
      <main className="container p-build-history_main">
        {builds
          .map((elem) => (
            <BuildCard cls="p-build-history_build" buildInfo={elem} />
          ))
          .slice(0, showNum)}
        {showNum < builds.length && (
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

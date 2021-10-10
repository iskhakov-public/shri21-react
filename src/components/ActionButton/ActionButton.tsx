import React from 'react'
import cn from 'classnames'
import Button from '../Button/Button'

import './ActionButton.css'

import { ReactComponent as RunIcon } from './icons/run.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'

export enum ActionType {
  Run = 'Run',
  Settings = 'Settings',
}

interface Props {
  type: ActionType
  collapsed?: boolean
  cls?: string
  onClick?: () => void
}

const ActionButton = ({ type, collapsed, cls, onClick }: Props) => {
  let icon: React.ReactNode
  let text: string
  switch (type) {
    case ActionType.Run:
      icon = <RunIcon />
      text = 'Run build'
      break
    case ActionType.Settings:
      icon = <SettingsIcon />
      text = 'Settings'
      break
  }
  return (
    <Button cls={cn(cls, 'action-button')} onClick={onClick}>
      {icon} {!collapsed && <span className="action-button_text">{text}</span>}
    </Button>
  )
}

export default ActionButton

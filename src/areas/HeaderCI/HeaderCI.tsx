import React from 'react'
import cn from 'classnames'

import { useWindowSize } from '../../hooks/useWindowSize'
import ActionButton, {
  ActionType,
} from '../../components/ActionButton/ActionButton'

import './HeaderCI.css'

type Action = {
  action: ActionType
  onClick: () => void
  collapsed?: boolean
}

interface Props {
  text?: string
  actions?: Action[]
  cls?: string
  textCls?: string
}

const HeaderCI = ({
  cls,
  textCls,
  actions,
  text = 'School CI Server',
}: Props) => {
  const [width, _] = useWindowSize()
  return (
    <div className={cn(cls, 'a-header-ci')}>
      <div className={cn(textCls, 'a-header-ci_title')}>{text}</div>
      <div className="a-header-ci_buttons">
        {actions &&
          actions.map(({ action, onClick, collapsed }) => (
            <ActionButton
              type={action}
              onClick={onClick}
              key={action}
              collapsed={collapsed || width < 550}
            />
          ))}
      </div>
    </div>
  )
}

export default HeaderCI

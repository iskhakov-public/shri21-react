import React from 'react'
import cn from 'classnames'

import './Button.css'

interface Props {
  type?: 'action' | 'default' | 'outlined'
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
  cls?: string
}

const Button = ({
  onClick,
  cls,
  children,
  disabled,
  type = 'default',
  ...otherProps
}: Props) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(cls, 'button', `button_${type}`, {
        button_disabled: disabled,
      })}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button

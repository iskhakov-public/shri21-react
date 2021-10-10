import React from 'react'
import cn from 'classnames'
import Input, { Props as InputProps } from '../Input/Input'

import './FormInteger.css'

interface Props extends InputProps {
  leftText?: string
  rightText?: string
  placeholder?: string
  inputWidth?: string
}

const FormInteger = ({
  leftText,
  rightText,
  placeholder,
  inputWidth = '55px',
  ...otherProps
}: Props) => {
  return (
    <div className={cn('form-integer')}>
      {leftText && <span className="form-integer_left">{leftText}</span>}
      <Input
        cls="form-integer_input"
        placeholder={placeholder}
        style={{ width: inputWidth }}
        {...otherProps}
      />
      {rightText && <span className="form-integer_right">{rightText}</span>}
    </div>
  )
}

export default FormInteger

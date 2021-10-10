import React, { useState } from 'react'
import cn from 'classnames'
import './Input.css'
import { ReactComponent as ClearIcon } from './Clear.svg'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  clearable?: boolean
  cls?: string
  withError?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = ({
  cls,
  placeholder,
  clearable,
  withError,
  onChange,
  onClear,
  ...otherProps
}: Props) => {
  const [input, setInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    onChange && onChange(e)
  }
  return (
    <div className="input_wrapper">
      <input
        className={cn(cls, 'input', { input_error: withError })}
        placeholder={placeholder}
        onChange={handleChange}
        value={input}
        {...otherProps}
      />
      {clearable && (
        <span
          className={cn('input_clear-icon', {
            'input_clear-icon-active': !!input,
          })}
          onClick={() => {
            setInput('')
            onClear?.()
          }}
        >
          <ClearIcon />
        </span>
      )}
    </div>
  )
}

export default Input

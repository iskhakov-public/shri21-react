import React from 'react'
import cn from 'classnames'

import Input, { Props as InputProps } from '../Input/Input'
import './FormField.css'

export interface Props extends InputProps {
  text: string
  id?: string
  required?: boolean
  cls?: string
}

const FormField = ({ text, cls, required, id, ...otherProps }: Props) => {
  return (
    <div className={cn(cls, 'form-field')}>
      <label className={cn('form-field_text')} htmlFor={id}>
        {text}
      </label>
      {required && <span className="form-field_required-star">*</span>}
      <Input id={id} clearable {...otherProps} />
    </div>
  )
}

export default FormField

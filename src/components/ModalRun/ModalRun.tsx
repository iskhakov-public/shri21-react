import React, { useState } from 'react'
import FormField, { Props as FormFieldProps } from '../FormField/FormField'
import Button from '../Button/Button'
import cn from 'classnames'

import './ModalRun.css'
import { useWindowSize } from '../../hooks/useWindowSize'

export interface Props extends Omit<FormFieldProps, 'text'> {
  cls?: string
  onRunBuild?: (hash: string) => void
  onCancel?: () => void
}

const ModalRun = ({ cls, onCancel, onRunBuild, ...otherProps }: Props) => {
  const [hash, setHash] = useState('')
  const [err, setErr] = useState(false)
  // const [width, _] = useWindowSize()

  const handleRun = () => {
    if (hash) {
      onRunBuild?.(hash)
      onCancel?.()
    } else {
      setErr(true)
    }
  }
  return (
    <div className={cn(cls, 'modal-run')}>
      <h2>New build</h2>
      {err && <p className="modal-run_error">Commit hash must be provided</p>}
      <FormField
        {...otherProps}
        placeholder="Commit hash"
        text="Enter the commit hash hich you want to build."
        onChange={(e) => setHash(e.target.value)}
        onClear={() => setHash('')}
      />
      <div className="modal-run_buttons">
        <Button type="action" onClick={handleRun}>
          Run build
        </Button>
        <Button onClick={onCancel} type="outlined">
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ModalRun

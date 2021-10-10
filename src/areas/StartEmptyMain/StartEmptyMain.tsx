import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { ReactComponent as BuildLogo } from './build.svg'

import './StartEmptyMain.css'
import Button from '../../components/Button/Button'

interface Props {
  cls?: string
  clsWrapper?: string
}

const StartEmptyMain = ({ cls, clsWrapper }: Props) => {
  return (
    <div className={cn(clsWrapper, 'a-start-empty-main_wrapper')}>
      <div className={cn(cls, 'a-start-empty-main')}>
        <BuildLogo />
        <div className="a-start-empty-main_text">
          Configure repository connection <br /> and synchronization settings
        </div>
        <Link to="/settings">
          <Button type="action">Open settings</Button>
        </Link>
      </div>
    </div>
  )
}

export default StartEmptyMain

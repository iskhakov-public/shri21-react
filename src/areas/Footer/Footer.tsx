import React from 'react'
import cn from 'classnames'

import './Footer.css'

interface Props {
  wrapperCls?: string
  cls?: string
}

const Footer = ({ cls, wrapperCls }: Props) => {
  return (
    <div className={cn(wrapperCls, 'a-footer_wrapper')}>
      <div className={cn(cls, 'a-footer')}>
        <ul className="a-footer_ul">
          <li>Support</li>
          <li>Learning</li>
          <li>Русская версия</li>
        </ul>
        <span>&copy; 2021 Your Name</span>
      </div>
    </div>
  )
}

export default Footer

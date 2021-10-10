import React from 'react'
import cn from 'classnames'
import { format, formatDuration, intervalToDuration } from 'date-fns'
import { ru } from 'date-fns/locale'

import { useWindowSize } from '../../hooks/useWindowSize'
import { IBuild } from '../../type'

import './BuildCard.css'

import { ReactComponent as DoneIcon } from './icons/done.svg'
import { ReactComponent as PendingIcon } from './icons/clock.svg'
import { ReactComponent as FailIcon } from './icons/fail.svg'
import { ReactComponent as CommitIcon } from './icons/code-commit.svg'
import { ReactComponent as UserIcon } from './icons/user.svg'
import { ReactComponent as CalendarIcon } from './icons/calendar.svg'
import { ReactComponent as WatchIcon } from './icons/stopwatch.svg'

interface Props {
  buildInfo: IBuild
  cls?: string
}

const BuildCard = ({ buildInfo, cls }: Props) => {
  const [width, _] = useWindowSize()
  let icon: any
  let clsText: string = 'build_card_info_'
  switch (buildInfo.status) {
    case 'ok':
      icon = <DoneIcon />
      clsText += 'success'
      break
    case 'pending':
      icon = <PendingIcon />
      clsText += 'pending'
      break
    case 'fail':
      icon = <FailIcon />
      clsText += 'fail'
      break
    default:
      clsText = ''
  }

  const duration = formatDuration(
    intervalToDuration({ start: 0, end: buildInfo.durationSeconds * 1000 }),
    { format: ['hours', 'minutes'], locale: ru },
  )
  const date = format(buildInfo.date, 'd MMM, kk:mm', { locale: ru })

  return (
    <div className={cn(cls, 'build-card')}>
      <div className="build-card_status-icon">{icon}</div>
      <div className="build-card_info">
        {width > 550 ? (
          <div className="build-card_info_description">
            <span className={cn(clsText, 'build-card_info_pr')}>
              #{buildInfo.buildNum}
            </span>{' '}
            {buildInfo.description}
          </div>
        ) : (
          <>
            <div className={cn(clsText, 'build-card_info_pr')}>
              #{buildInfo.buildNum}
            </div>
            <div className="build-card_info_desc-text ">
              {buildInfo.description}
            </div>
          </>
        )}
        <div className="build-card_info_git">
          <CommitIcon className="build-card_info_icon" /> {buildInfo.branch}{' '}
          <span className="build-card_info_commit">{buildInfo.commit}</span>
        </div>
        <div className="build-card_info_user">
          <UserIcon className="build-card_info_icon" /> {buildInfo.user}
        </div>
        <div className="build-card_dates">
          <CalendarIcon className="build-card_info_icon" />
          {date}
        </div>
        <div className="build-card_dates">
          <WatchIcon className="build-card_info_icon" />
          {duration}
        </div>
      </div>
    </div>
  )
}

export default BuildCard

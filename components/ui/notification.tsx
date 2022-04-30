import { FC } from 'react'
import clsx from 'clsx'

import classes from './notification.module.css'
import { createPortal } from 'react-dom'

type Props = {
  title: string
  message: string
  status: 'success' | 'loading' | 'error'
}

const Notification: FC<Props> = ({ title, message, status }) => {
  const cssClassName = clsx([
    classes.notification,
    status === 'success' && classes.success,
    status === 'loading' && classes.loading,
    status === 'error' && classes.error,
  ])

  const jsx = (
    <div className={cssClassName}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )

  const notificationEle = document.getElementById('notifications')
  if (!notificationEle) return jsx

  return createPortal(jsx, notificationEle)
}

export default Notification

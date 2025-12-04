import React from 'react'
import styles from './Notification.module.scss'

interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
      )}
    </div>
  )
}


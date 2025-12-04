import React from 'react'
import styles from './Badge.module.scss'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  )
}


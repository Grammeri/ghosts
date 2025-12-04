'use client'

import React from 'react'
import { ThemeToggle } from '@shared/ui/ThemeToggle/ThemeToggle'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Yokai Monitoring Dashboard</h1>
          <p className={styles.description}>
            Real-time anomaly tracking across Tokyo
          </p>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}


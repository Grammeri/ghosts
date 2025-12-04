'use client'

import React from 'react'
import { useTheme } from '@shared/lib/theme-provider'
import styles from './ThemeToggle.module.scss'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      type="button"
    >
      <span className={styles.icon}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.text}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}


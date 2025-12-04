import React from 'react'
import { useAnomalies, useAnomaliesStream } from '@entities/anomaly/api/anomaly-queries'
import { AnomalyCard } from '@entities/anomaly/ui/AnomalyCard/AnomalyCard'
import styles from './AnomaliesList.module.scss'

export const AnomaliesList: React.FC = () => {
  const { data, isLoading, error } = useAnomalies()

  useAnomaliesStream()

  if (isLoading) {
    return <div className={styles.loading}>Loading anomalies...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading anomalies</div>
  }

  if (!data || data.length === 0) {
    return <div className={styles.empty}>No anomalies found</div>
  }

  return (
    <div className={styles.list}>
      {data.map((anomaly) => (
        <AnomalyCard key={anomaly.id} anomaly={anomaly} />
      ))}
    </div>
  )
}


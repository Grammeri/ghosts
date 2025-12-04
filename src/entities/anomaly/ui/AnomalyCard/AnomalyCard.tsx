import React from 'react'
import type { Anomaly } from '../../model/types'
import styles from './AnomalyCard.module.scss'

interface AnomalyCardProps {
  anomaly: Anomaly
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({ anomaly }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{anomaly.name}</h3>
      <div className={styles.details}>
        <span className={styles.threat}>Threat: {anomaly.threat}</span>
        <span className={styles.location}>Location: {anomaly.location}</span>
        <span className={styles.status}>Status: {anomaly.status}</span>
      </div>
    </div>
  )
}


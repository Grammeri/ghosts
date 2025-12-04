import React from 'react'
import type { Anomaly } from '../../model/types'
import { Badge } from '@shared/ui/Badge/Badge'
import { CaptureButton } from '@features/capture-anomaly/ui/CaptureButton/CaptureButton'
import { THREAT_LEVELS, STATUS } from '@shared/config/constants'
import styles from './AnomalyCard.module.scss'

interface AnomalyCardProps {
  anomaly: Anomaly
}

function getThreatBadgeVariant(threat: Anomaly['threat']): 'success' | 'warning' | 'danger' | 'info' {
  switch (threat) {
    case THREAT_LEVELS.LOW:
      return 'success'
    case THREAT_LEVELS.MEDIUM:
      return 'warning'
    case THREAT_LEVELS.HIGH:
      return 'danger'
    case THREAT_LEVELS.CRITICAL:
      return 'danger'
    default:
      return 'info'
  }
}

function getThreatClass(threat: Anomaly['threat']): string {
  switch (threat) {
    case THREAT_LEVELS.LOW:
      return 'threatLow'
    case THREAT_LEVELS.MEDIUM:
      return 'threatMedium'
    case THREAT_LEVELS.HIGH:
      return 'threatHigh'
    case THREAT_LEVELS.CRITICAL:
      return 'threatCritical'
    default:
      return ''
  }
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({ anomaly }) => {
  const isCaptured = anomaly.status === STATUS.CAPTURED
  const threatVariant = getThreatBadgeVariant(anomaly.threat)
  const threatClass = getThreatClass(anomaly.threat)

  return (
    <div className={`${styles.card} ${styles[threatClass]}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{anomaly.name}</h3>
        <Badge variant={threatVariant}>{anomaly.threat}</Badge>
      </div>

      <div className={styles.details}>
        <div className={styles.location}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{anomaly.location}</span>
        </div>

        <div className={styles.status}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.value} ${isCaptured ? styles.captured : styles.active}`}>
            {anomaly.status}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <CaptureButton
          anomalyId={anomaly.id}
          isCaptured={isCaptured}
        />
      </div>
    </div>
  )
}

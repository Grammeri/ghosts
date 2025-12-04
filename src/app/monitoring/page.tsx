import { AnomaliesList } from '@widgets/anomalies-list/ui/AnomaliesList'
import styles from './page.module.scss'

export default function MonitoringPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Yokai Monitoring Dashboard</h1>
        <p className={styles.description}>
          Real-time anomaly tracking across Tokyo
        </p>
      </header>

      <main className={styles.main}>
        <AnomaliesList />
      </main>
    </div>
  )
}

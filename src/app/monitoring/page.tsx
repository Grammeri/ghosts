import { AnomaliesList } from '@widgets/anomalies-list/ui/AnomaliesList'
import { Header } from '@widgets/header/ui/Header'
import styles from './page.module.scss'

export default function MonitoringPage() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <AnomaliesList />
      </main>
    </div>
  )
}

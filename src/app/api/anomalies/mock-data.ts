import type { Anomaly } from '@entities/anomaly/model/types'
import { STATUS, THREAT_LEVELS } from '@shared/config/constants'

export const mockAnomalies: Anomaly[] = [
  {
    id: 1,
    name: 'Kitsune',
    threat: THREAT_LEVELS.LOW,
    location: 'Shibuya',
    status: STATUS.ACTIVE,
  },
  {
    id: 2,
    name: 'Oni',
    threat: THREAT_LEVELS.HIGH,
    location: 'Shinjuku',
    status: STATUS.ACTIVE,
  },
  {
    id: 3,
    name: 'Tengu',
    threat: THREAT_LEVELS.MEDIUM,
    location: 'Asakusa',
    status: STATUS.ACTIVE,
  },
  {
    id: 4,
    name: 'Yuki-onna',
    threat: THREAT_LEVELS.HIGH,
    location: 'Roppongi',
    status: STATUS.ACTIVE,
  },
  {
    id: 5,
    name: 'Nurikabe',
    threat: THREAT_LEVELS.MEDIUM,
    location: 'Ikebukuro',
    status: STATUS.ACTIVE,
  },
  {
    id: 6,
    name: 'Kappa',
    threat: THREAT_LEVELS.LOW,
    location: 'Ueno',
    status: STATUS.ACTIVE,
  },
  {
    id: 7,
    name: 'Jorogumo',
    threat: THREAT_LEVELS.CRITICAL,
    location: 'Harajuku',
    status: STATUS.ACTIVE,
  },
]

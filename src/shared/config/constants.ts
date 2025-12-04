export const THREAT_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
} as const;

export const STATUS = {
  ACTIVE: "Active",
  CAPTURED: "Captured",
} as const;

export const THREAT_COLORS = {
  [THREAT_LEVELS.LOW]: "#4caf50",
  [THREAT_LEVELS.MEDIUM]: "#ff9800",
  [THREAT_LEVELS.HIGH]: "#FF4FA3",
  [THREAT_LEVELS.CRITICAL]: "#f44336",
} as const;

export const API_DELAYS = {
  GET_ANOMALIES: 800,
  CAPTURE_ANOMALY: 500,
  SSE_INTERVAL: 5000,
} as const;

export const CAPTURE_ERROR_PROBABILITY = 0.3;

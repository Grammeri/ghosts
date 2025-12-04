"use client";

import React, { useState, useCallback } from "react";
import {
  useAnomalies,
  useAnomaliesStream,
} from "@entities/anomaly/api/anomaly-queries";
import { AnomalyCard } from "@entities/anomaly/ui/AnomalyCard/AnomalyCard";
import { Notification } from "@shared/ui/Notification/Notification";
import styles from "./AnomaliesList.module.scss";

interface NotificationState {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

export const AnomaliesList: React.FC = () => {
  const { data, isLoading, error } = useAnomalies();
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  useAnomaliesStream();

  const handleError = useCallback((errorMessage: string) => {
    const newNotification: NotificationState = {
      message: errorMessage || "Failed to capture anomaly",
      type: "error",
      id: Date.now(),
    };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notif) => notif.id !== newNotification.id)
      );
    }, 5000);
  }, []);

  const handleSuccess = useCallback((message: string) => {
    const newNotification: NotificationState = {
      message,
      type: "success",
      id: Date.now(),
    };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notif) => notif.id !== newNotification.id)
      );
    }, 3000);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading anomalies...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading anomalies. Please try again later.
      </div>
    );
  }

  const anomalies = data ?? [];

  if (anomalies.length === 0) {
    return <div className={styles.empty}>No anomalies found</div>;
  }

  return (
    <div className={styles.container}>
      {notifications.length > 0 && (
        <div className={styles.notifications}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      )}

      <div className={styles.list}>
        {anomalies.map((anomaly) => (
          <AnomalyCard
            key={anomaly.id}
            anomaly={anomaly}
            onCaptureError={handleError}
            onCaptureSuccess={handleSuccess}
          />
        ))}
      </div>
    </div>
  );
};

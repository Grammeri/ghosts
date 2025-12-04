"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAnomalies,
  useAnomaliesStream,
} from "@entities/anomaly/api/anomaly-queries";
import { AnomalyCard } from "@entities/anomaly/ui/AnomalyCard/AnomalyCard";
import { Notification } from "@shared/ui/Notification/Notification";
import { VictoryModal } from "@widgets/victory-modal/ui/VictoryModal";
import { AnomaliesListSkeleton } from "./AnomaliesListSkeleton";
import { STATUS } from "@shared/config/constants";
import { queryKeys } from "@shared/config/query-keys";
import type { Anomaly } from "@entities/anomaly/model/types";
import confetti from "canvas-confetti";
import styles from "./AnomaliesList.module.scss";

interface NotificationState {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

export const AnomaliesList: React.FC = () => {
  const { data, isLoading, error } = useAnomalies();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<NotificationState[]>([]);
  const [victoryShown, setVictoryShown] = useState(false);
  const previousCapturedCountRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useAnomaliesStream();

  useEffect(() => {
    setMounted(true);
  }, []);

  const anomalies = data ?? [];

  const capturedCount = anomalies.filter(
    (a) => a.status === STATUS.CAPTURED
  ).length;
  const totalCount = anomalies.length;
  const allCaptured = totalCount > 0 && capturedCount === totalCount;

  useEffect(() => {
    if (!mounted || isLoading || totalCount === 0) return;

    if (previousCapturedCountRef.current === null) {
      previousCapturedCountRef.current = capturedCount;
      return;
    }

    previousCapturedCountRef.current = capturedCount;
  }, [capturedCount, totalCount, mounted, isLoading]);

  useEffect(() => {
    if (victoryShown) {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [victoryShown]);

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

  const handleSuccess = useCallback(
    (message: string) => {
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

      setTimeout(() => {
        const currentAnomalies = queryClient.getQueryData<Anomaly[]>(
          queryKeys.anomalies.list()
        );

        if (!currentAnomalies) return;

        const allNowCaptured =
          currentAnomalies.length > 0 &&
          currentAnomalies.every((a) => a.status === STATUS.CAPTURED);

        if (allNowCaptured) {
          setVictoryShown(true);
        }
      }, 100);
    },
    [queryClient]
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  if (isLoading) {
    return <AnomaliesListSkeleton />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading anomalies. Please try again later.
      </div>
    );
  }

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

      <VictoryModal
        isOpen={victoryShown}
        onClose={() => {
          setVictoryShown(false);
        }}
      />
    </div>
  );
};

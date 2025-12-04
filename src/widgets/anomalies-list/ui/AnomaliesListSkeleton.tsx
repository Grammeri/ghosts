import { Skeleton } from "@shared/ui/Skeleton/Skeleton";
import styles from "./AnomaliesListSkeleton.module.scss";

export const AnomaliesListSkeleton = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height="160px" radius="12px" />
      ))}
    </div>
  );
};


import React from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  radius?: number | string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = "100px",
  width = "100%",
  radius = "12px",
}) => {
  return (
    <div
      className={styles.skeleton}
      style={{ height, width, borderRadius: radius }}
    />
  );
};



"use client";

import React from "react";
import { Modal } from "@shared/ui/Modal/Modal";
import { Button } from "@shared/ui/Button/Button";
import styles from "./VictoryModal.module.scss";

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.icon}>🎉</div>
        <h2 className={styles.title}>Congratulations!</h2>
        <p className={styles.message}>
          All spirits captured. Tokyo is safe.
        </p>
        <div className={styles.buttonWrapper}>
          <Button
            onClick={(e) => {
              e?.stopPropagation();
              onClose();
            }}
            variant="primary"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};


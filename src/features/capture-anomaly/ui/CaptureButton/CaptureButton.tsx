import React from 'react'
import { useCaptureAnomalyMutation } from '../../api/capture-mutation'
import { Button } from '@shared/ui/Button/Button'
import { handleApiError } from '@shared/api/errors'
import styles from './CaptureButton.module.scss'

interface CaptureButtonProps {
  anomalyId: number
  isCaptured: boolean
  onError?: (error: string) => void
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
  anomalyId,
  isCaptured,
  onError,
}) => {
  const mutation = useCaptureAnomalyMutation()

  const handleCapture = () => {
    mutation.mutate(anomalyId, {
      onError: (error) => {
        const errorMessage = handleApiError(error)
        onError?.(errorMessage || 'Failed to capture anomaly')
      },
    })
  }

  const isLoading = mutation.isPending
  const isDisabled = isCaptured || isLoading

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={handleCapture}
        disabled={isDisabled}
        variant="primary"
        type="button"
      >
        {isLoading && <span className={styles.spinner} />}
        <span className={styles.buttonText}>
          {isLoading ? 'Capturing...' : isCaptured ? 'Captured' : 'Capture'}
        </span>
      </Button>
    </div>
  )
}

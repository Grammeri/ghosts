import React from 'react'
import { useCaptureAnomalyMutation } from '../../api/capture-mutation'
import { Button } from '@shared/ui/Button/Button'
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
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to capture anomaly'
        onError?.(errorMessage)
      },
    })
  }

  return (
    <Button
      onClick={handleCapture}
      disabled={isCaptured || mutation.isPending}
      variant="primary"
    >
      {mutation.isPending ? 'Capturing...' : 'Capture'}
    </Button>
  )
}


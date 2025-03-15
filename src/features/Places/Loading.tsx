import { useEffect } from "react";

import { Column, LinearProgress, Row, useProgress } from "@/components";

import { PROGRESS_BAR_WIDTH } from "./constants";

export interface LoadingProps {
  isLoading: boolean;
  onLoaded: (status: boolean) => void;
}

export const Loading = ({ isLoading = false, onLoaded }: LoadingProps) => {
  const { finishProgress, progress, showProgress, startProgress } =
    useProgress(PROGRESS_BAR_WIDTH);

  useEffect(() => {
    if (!showProgress) {
      onLoaded(true);
    }
  }, [showProgress, onLoaded]);

  useEffect(() => {
    if (isLoading) {
      finishProgress();
    } else {
      startProgress();
    }
  }, [isLoading, finishProgress, startProgress]);

  return (
    showProgress && (
      <Row
        className="m-auto mb-10 h-full"
        style={{ width: `${PROGRESS_BAR_WIDTH}px` }}
      >
        <Column className="grow justify-center">
          <LinearProgress value={progress * 100} />
        </Column>
      </Row>
    )
  );
};

import { Column, LinearProgress, Row, useProgress } from "@/components";
import { PROGRESS_BAR_WIDTH } from "./constants";
import { useEffect } from "react";

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
  }, [showProgress]);

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
        className="m-auto h-full mb-10"
        style={{ width: `${PROGRESS_BAR_WIDTH}px` }}
      >
        <Column className="grow justify-center">
          <LinearProgress value={progress * 100} />
        </Column>
      </Row>
    )
  );
};

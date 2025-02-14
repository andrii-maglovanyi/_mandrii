"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const easeOutQuart = (x: number) => Math.sin((x * Math.PI) / 2);

export const useProgress = (size: number) => {
  const [showProgress, setShowProgress] = useState(true);
  const [progress, setProgress] = useState(0);

  const STEP = 1 / size;
  const SLACK = STEP * 5;

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentProgress = useRef(0);
  const stop = useRef(false);

  const startProgress = useCallback(() => {
    const progressFinishedPoint = 1 - SLACK - STEP * 2;

    const start = () => {
      const prog = +currentProgress.current.toFixed(8);

      currentProgress.current =
        stop.current && prog < progressFinishedPoint
          ? progressFinishedPoint
          : prog + STEP;

      setProgress(prog);

      if (prog >= 1 - SLACK) {
        return;
      }

      timeout.current = setTimeout(start, easeOutQuart(prog) * 350);
    };

    start();
  }, [SLACK, STEP]);

  useEffect(() => {
    if (progress >= 1 - SLACK && stop.current) {
      setShowProgress(false);
    }
  }, [SLACK, progress]);

  const finishProgress = useCallback(() => {
    stop.current = true;

    if (currentProgress.current >= 1 - SLACK) {
      setShowProgress(false);
    }
  }, [SLACK]);

  return {
    finishProgress,
    progress,
    showProgress,
    startProgress,
  };
};

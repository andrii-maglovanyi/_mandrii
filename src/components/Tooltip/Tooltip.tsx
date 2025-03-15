"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import type { BaseComponentProps } from "@/types";

export interface TooltipProps extends BaseComponentProps {
  children: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  text?: string;
}

export const Tooltip = ({
  children,
  "data-testid": testId = "tooltip",
  mouseEnterDelay,
  mouseLeaveDelay,
  onVisibleChange,
  placement = "top",
  text,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onVisibleChange?.(visible);
  }, [visible, onVisibleChange]);

  const onMouseEnter = useCallback(() => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (mouseEnterDelay) {
      enterTimeout.current = setTimeout(
        () => setVisible(true),
        mouseEnterDelay * 1000
      );
    } else {
      setVisible(true);
    }
  }, [mouseEnterDelay]);

  const onMouseLeave = useCallback(() => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (mouseLeaveDelay) {
      enterTimeout.current = setTimeout(
        () => setVisible(false),
        mouseLeaveDelay * 1000
      );
    } else {
      setVisible(false);
    }
  }, [mouseLeaveDelay]);

  const getPositionClasses = () => {
    switch (placement) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "top-start":
        return "bottom-full left-0 mb-2";
      case "top-end":
        return "bottom-full right-0 mb-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "right-start":
        return "left-full top-0 ml-2";
      case "right-end":
        return "left-full bottom-0 ml-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "bottom-start":
        return "top-full left-0 mt-2";
      case "bottom-end":
        return "top-full right-0 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "left-start":
        return "right-full top-0 mr-2";
      case "left-end":
        return "right-full bottom-0 mr-2";
      default:
        return "";
    }
  };

  const getArrowClasses = () => {
    switch (placement) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-t-primary-1000 dark:border-t-primary-0";
      case "top-start":
        return "top-full left-4 border-t-primary-1000 dark:border-t-primary-0";
      case "top-end":
        return "top-full right-4 border-t-primary-1000 dark:border-t-primary-0";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-r-primary-1000 dark:border-r-primary-0";
      case "right-start":
        return "right-full top-4 border-r-primary-1000 dark:border-r-primary-0";
      case "right-end":
        return "right-full bottom-4 border-r-primary-1000 dark:border-r-primary-0";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-primary-1000 dark:border-b-primary-0";
      case "bottom-start":
        return "bottom-full left-4 border-b-primary-1000 dark:border-b-primary-0";
      case "bottom-end":
        return "bottom-full right-4 border-b-primary-1000 dark:border-b-primary-0";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-primary-1000 dark:border-l-primary-0";
      case "left-start":
        return "left-full top-4 border-l-primary-1000 dark:border-l-primary-0";
      case "left-end":
        return "left-full bottom-4 border-l-primary-1000 dark:border-l-primary-0";
      default:
        return "";
    }
  };

  return (
    <span className="relative">
      <span
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onMouseEnter();
          }
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
      {visible && text && (
        <div
          className={`
            absolute
            ${getPositionClasses()}
            bg-primary-1000 text-primary-0 z-50 rounded-lg px-3 py-2 text-sm
            font-semibold whitespace-nowrap shadow-lg
            dark:bg-primary-0 dark:text-primary-1000
          `}
          data-testid={testId}
        >
          {text}
          <div
            className={`
              fixed h-0 w-0 border-4 border-transparent
              ${getArrowClasses()}
            `}
            style={{ zIndex: 1000 }}
          />
        </div>
      )}
    </span>
  );
};

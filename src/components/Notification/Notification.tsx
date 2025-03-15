"use client";

import { memo, useEffect } from "react";

import {
  type BaseComponentProps,
  CONNOTATIONS,
  type Connotations,
} from "@/types";

import { Button } from "../Button/Button";
import { Icon, type IconType } from "../Icon/Icon";

interface SnackbarElementProps extends BaseComponentProps {
  index?: number;
}

export interface SnackbarProps extends SnackbarElementProps {
  connotation?: Connotations;
  dismissible?: boolean;
  header?: string;
  icon?: IconType;
  message: string;
  onClose: () => void;
  open?: boolean;
}

const calculateDisplayTime = (message: string) => {
  const words = message.split(" ").length;
  const timePerWord = 1000; // milliseconds

  return Math.min(Math.max(words * timePerWord, 5000), 15000);
};

export const Notification = memo(function Snackbar({
  connotation = "primary",
  "data-testid": testId = "snackbar",
  dismissible = false,
  header,
  icon,
  index = 0,
  message,
  onClose,
  open = false,
}: SnackbarProps) {
  const SNACKBAR_HEIGHT = header ? 75 : 50; // px
  useEffect(() => {
    setTimeout(onClose, calculateDisplayTime(message));
  }, [message, onClose]);

  const onClick = (event: React.SyntheticEvent<Element, Event>) => {
    event.stopPropagation();
    onClose();
  };

  const iconStyles = `mr-4 ${
    connotation === CONNOTATIONS.primary
      ? "fill-primary-0 dark:fill-primary-1000"
      : ""
  }`;

  const snackbarIcon = icon && (
    <Icon
      className={iconStyles}
      connotation={connotation}
      data-testid={`icon-${icon}`}
      type={icon}
    />
  );

  return (
    open && (
      <div
        className={`
          bg-primary-1000 text-primary-0 drop-shadow-base fixed right-0 bottom-4
          left-0 z-50 mx-auto flex w-min max-w-[90%] min-w-96 transform
          items-center justify-between rounded-lg p-4 transition-transform
          dark:bg-primary-50 dark:text-primary-1000
        `}
        data-testid={testId}
        style={{
          height: `${SNACKBAR_HEIGHT}px`,
          transform: `translateY(${-index / 2 - index * SNACKBAR_HEIGHT}px)`,
        }}
      >
        {snackbarIcon}
        <div>
          {header ? (
            <div className="mb-1 text-lg font-semibold">{header}</div>
          ) : null}
          <div className="truncate">{message}</div>
        </div>
        {dismissible && (
          <div className="border-primary-200 ml-4 border-l pl-2">
            <Button
              className={`
                fill-primary-50
                active:bg-primary-800
                dark:fill-primary-1000 dark:active:bg-primary-100
                dark:hover:bg-transparent
                hover:bg-transparent
              `}
              data-testid="snackbar-button"
              icon="close-line"
              onClick={onClick}
              size="condensed"
            />
          </div>
        )}
      </div>
    )
  );
});
